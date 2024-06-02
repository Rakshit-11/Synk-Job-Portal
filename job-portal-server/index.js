const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const UserDetail = require('./models/UserDetails');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { GridFSBucket } = require('mongodb');
const ObjectId = require('mongoose').Types.ObjectId;
const JobApplication = require('./models/JobApplication');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cors({
   origin: 'https://synk-job-portal.vercel.app',
   methods: ['POST', 'GET'],
  credentials: true }));

app.use(cookieParser());

// MongoDB connection URI
const uri = `mongodb+srv://rakshitshetty59:fi2HIBGU1hJKUPqa@synk-job.ezfbqmi.mongodb.net/synk_database?retryWrites=true&w=majority`;

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.log("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process if connection fails
  });

// Ensure MongoDB connection and GridFSBucket setup
let gfsBucket;
mongoose.connection.once('open', () => {
  gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'resumes' });
  console.log('GridFSBucket initialized');
});

// Multer storage setup with path normalization
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .pdf, .doc, and .docx files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// JWT authentication middleware
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = user;
    next();
  });
};

// Define routes

// User Registration
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashedPassword });
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
    res.status(201).json({ user });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ error: 'User registration failed', details: err });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not registered" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
    res.json({ message: "success", user });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Login failed", details: err });
  }
});

// Post a job
app.post("/post-job", authenticateJWT, async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date();
    body.postedBy = req.user.email;
    const result = await mongoose.connection.collection('synkJobs').insertOne(body);
    if (result.insertedId) {
      return res.status(200).send(result);
    } else {
      return res.status(404).send({
        message: "Cannot insert. Please try again later.",
        status: false
      });
    }
  } catch (err) {
    console.error("Error in /post-job:", err);
    res.status(500).json({ error: 'Failed to post job', details: err });
  }
});

// Fetch all jobs
// Fetch all jobs sorted by posting date in descending order
app.get("/all-jobs", async (req, res) => {
  try {
    const jobs = await mongoose.connection.collection('synkJobs').find({}).toArray(); // Convert cursor to array
    const sortedJobs = jobs.sort((a, b) => b.postingDate - a.postingDate); 
    res.send(jobs);
  } catch (err) {
    console.error("Error in /all-jobs:", err);
    res.status(500).json({ error: 'Failed to fetch jobs', details: err });
  }
});



// Get single job by id
app.get("/all-jobs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const job = await mongoose.connection.collection('synkJobs').findOne({ _id: new mongoose.Types.ObjectId(id) });
    res.send(job);
  } catch (err) {
    console.error("Error in /all-jobs/:id:", err);
    res.status(500).json({ error: 'Failed to fetch job', details: err });
  }
});

// Get jobs by email
app.get("/myJobs/:email", authenticateJWT, async (req, res) => {
  try {
    if (req.user.email !== req.params.email) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const jobs = await mongoose.connection.collection('synkJobs').find({ postedBy: req.params.email }).toArray();
    res.send(jobs);
  } catch (err) {
    console.error("Error in /myJobs/:email:", err);
    res.status(500).json({ error: 'Failed to fetch jobs', details: err });
  }
});

// Delete a job
app.delete("/job/:id", authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new mongoose.Types.ObjectId(id), postedBy: req.user.email };
    const result = await mongoose.connection.collection('synkJobs').deleteOne(filter);
    res.send(result);
  } catch (err) {
    console.error("Error in /job/:id:", err);
    res.status(500).json({ error: 'Failed to delete job', details: err });
  }
});

// Update a job
app.patch("/edit-job/:id", authenticateJWT, async (req, res) => {
  try {
    const id = req.params.id;
    const jobData = req.body;
    const filter = { _id: new mongoose.Types.ObjectId(id), postedBy: req.user.email };
    const updateDoc = { $set: { ...jobData } };
    const result = await mongoose.connection.collection('synkJobs').updateOne(filter, updateDoc);
    res.send(result);
  } catch (err) {
    console.error("Error in /update-job/:id:", err);
    res.status(500).json({ error: 'Failed to update job', details: err });
  }
});

// User Logout
app.post('/logout', authenticateJWT, (req, res) => {
  res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
  res.json({ message: 'Logged out successfully' });
});

// Get Current User
app.get('/api/auth/current-user', authenticateJWT, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error("Error in /api/auth/current-user:", error);
    res.status(500).send('Server error');
  }
});

// Save User Details with Resume
app.post('/api/userdetails', authenticateJWT, upload.single('resume'), async (req, res) => {
  try {
    const { personalInfo, professionalInfo } = req.body;
    const { filename: resume } = req.file; // Retrieve the filename of the uploaded resume

    // Retrieve the user ID from the authenticated user
    const userId = new ObjectId(req.user.id);

    // Check if user details already exist
    let userDetails = await UserDetail.findOne({ userId });
    if (userDetails) {
      // Update existing user details
      userDetails.personalInfo = JSON.parse(personalInfo);
      userDetails.professionalInfo = JSON.parse(professionalInfo);
      userDetails.optionalInfo = { resume };
    } else {
      // Create new user details
      userDetails = new UserDetail({
        userId: userId, // Add the userId to the user details
        personalInfo: JSON.parse(personalInfo),
        professionalInfo: JSON.parse(professionalInfo),
        optionalInfo: {
          resume: resume // Save the filename of the uploaded resume
        }
      });
    }

    await userDetails.save();
      
    res.status(201).json({ acknowledged: true }); // Respond with acknowledgment
  } catch (err) {
    console.error("Error saving user details:", err);
    res.status(500).json({ error: 'Failed to save user details', details: err });
  }
});


app.get('/api/userdetails', authenticateJWT, async (req, res) => {
  try {
    // Fetch the user's ID from the JWT token
    const userId = req.user.id;

    // Find the user details for the authenticated user
    const userDetails = await UserDetail.findOne({ userId });
    if (!userDetails) {
      return res.status(404).json({ error: 'User details not found' });
    }

    // Send the user details as JSON
    res.json(userDetails);
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ error: 'Failed to fetch user details', details: err });
  }
});

// Serve the resume file when requested explicitly
app.get('/api/userdetails/resume', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const userDetails = await UserDetail.findOne({ userId });

    if (!userDetails || !userDetails.optionalInfo || !userDetails.optionalInfo.resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    // URL to access the resume file
    const resumeUrl = `http://localhost:${port}/uploads/${userDetails.optionalInfo.resume}`;
    res.json({ url: resumeUrl });
  } catch (err) {
    console.error("Error fetching resume URL:", err);
    res.status(500).json({ error: 'Failed to fetch resume URL', details: err.message });
  }
});

app.post('/api/apply-job', authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.body;

    // Check if the user has already applied to the specified job
    const existingApplication = await JobApplication.findOne({ userId, jobId });
    if (existingApplication) {
      return res.status(400).json({ error: 'User has already applied to this job' });
    }

    const userDetails = await UserDetail.findOne({ userId });
    if (!userDetails) {
      return res.status(404).json({ error: 'User details not found' });
    }

    const { personalInfo, professionalInfo, optionalInfo } = userDetails;
    const { resume } = optionalInfo;

    const application = new JobApplication({
      userId,
      jobId,
      personalInfo,
      professionalInfo,
      resume
    });

    await application.save();

    res.status(201).json({ message: 'Application submitted successfully', application });
  } catch (err) {
    console.error("Error applying for job:", err);
    res.status(500).json({ error: 'Error applying for job. Please try again.', details: err });
  }
});


app.get('/api/applicants/:jobId', authenticateJWT, async (req, res) => {
  try {
    const { jobId } = req.params;

    // Validate jobId
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(400).json({ error: 'Invalid jobId' });
    }

    // Retrieve all applications for the job
    const applications = await JobApplication.find({ jobId: new mongoose.Types.ObjectId(jobId) }).populate('userId', 'name email');

    const applicants = applications.map(application => ({
      id: application._id,
      name: application.userId.name,
      email: application.userId.email,
      personalInfo: application.personalInfo,
      professionalInfo: application.professionalInfo,
      resumeUrl: `http://localhost:5000/uploads/${application.resume}`
    }));

    console.log('Applicants fetched:', applicants); // Debug log
    res.status(200).json(applicants);
  } catch (err) {
    console.error("Error fetching applicants:", err);
    res.status(500).json({ error: 'Failed to fetch applicants', details: err });
  }
});





// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/api', (req, res) => {
  res.send("hello api");
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});
