# Synk Job Portal

Synk Job Portal is a full-stack web application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a platform for users to post job listings, apply for jobs, and manage their job applications.

## Features

- **User Authentication**: Users can register, login, and logout securely using JWT authentication.
- **Job Listings**: Users can post job listings, including details such as job title, company name, salary, location, and required skills.
- **Job Applications**: Users can apply for jobs by submitting their resume and application details.
- **User Profiles**: Users can view and manage their job applications and update their profile details.
- **Applicants** :- Recruiter can view all the applicants that have applied for the job role


## Technologies Used

- **Frontend**: React.js, React Router, React Bootstrap, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Uploads**: Multer for handling file uploads (resumes)
- **Styling**: Bootstrap 5, Tailwind CSS (optional)

## Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/synk-job-portal.git`
2. Navigate to the project directory: `cd synk-job-portal`
3. Install backend dependencies: `cd job-portal-server && npm install`
4. Install frontend dependencies: `cd ../job-portal-client && npm install`
5. Start the backend server: `npm start` in the `job-portal-server` directory
6. Start the frontend development server: `npm run dev` in the `job-portal-client` directory
7. Access the application in your browser at: `http://localhost:5173

## Deployment

The project can be deployed to production using platforms like Heroku for the backend and Vercel for the frontend. Make sure to set up environment variables for sensitive information such as database credentials and JWT secret key.


