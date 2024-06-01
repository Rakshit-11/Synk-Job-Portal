const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  personalInfo: {
    name: {
      type: String,
      required: true
    },
    dob: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    mobile: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    }
  },
  professionalInfo: {
    totalExperience: {
      type: String,
      required: true
    },
    currentOrganization: {
      type: String,
      required: true
    },
    currentDesignation: {
      type: String,
      required: true
    },
    currentCTC: {
      type: String,
      required: true
    }
  },
  optionalInfo: {
    resume: {
      type: String // This could be a path to the uploaded file or a reference depending on your storage strategy
    }
  }
});

const UserDetail = mongoose.model('UserDetail', userSchema);

module.exports = UserDetail;
