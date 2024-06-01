import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    dob: '',
    email: '',
    mobile: '',
    location: ''
  });

  const [professionalInfo, setProfessionalInfo] = useState({
    totalExperience: '',
    currentOrganization: '',
    currentDesignation: '',
    currentCTC: ''
  });

  const [optionalInfo, setOptionalInfo] = useState({
    resume: null,
    resumeURL: ''
  });

  useEffect(() => {
    // Fetch user details from the backend when the component mounts
    axios.get('https://synk-job-portal-server.vercel.app/api/userdetails', { withCredentials: true })
      .then(response => {
        const { personalInfo, professionalInfo, optionalInfo } = response.data;
        setPersonalInfo(personalInfo || {
          name: '',
          dob: '',
          email: '',
          mobile: '',
          location: ''
        });
        setProfessionalInfo(professionalInfo || {
          totalExperience: '',
          currentOrganization: '',
          currentDesignation: '',
          currentCTC: ''
        });
        setOptionalInfo(optionalInfo || { resume: null, resumeURL: '' });
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });

    // Fetch the resume URL
    axios.get('https://synk-job-portal-server.vercel.app/userdetails/resume', { withCredentials: true })
      .then(response => {
        setOptionalInfo(prevState => ({
          ...prevState,
          resumeURL: response.data.url
        }));
      })
      .catch(error => {
        console.error('Error fetching resume URL:', error);
      });
  }, []);

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    if (name === 'dob') {
      // Format DOB to "yyyy-MM-dd"
      const formattedDOB = new Date(value).toISOString().split('T')[0];
      setPersonalInfo({ ...personalInfo, [name]: formattedDOB });
    } else {
      setPersonalInfo({ ...personalInfo, [name]: value });
    }
  };

  const handleProfessionalInfoChange = (e) => {
    const { name, value } = e.target;
    setProfessionalInfo({ ...professionalInfo, [name]: value });
  };

  const handleOptionalInfoChange = (e) => {
    const file = e.target.files[0];
    setOptionalInfo({ resume: file });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!optionalInfo.resume) {
      alert('Please upload your resume.');
      return;
    }

    const formData = new FormData();
    formData.append('personalInfo', JSON.stringify(personalInfo));
    formData.append('professionalInfo', JSON.stringify(professionalInfo));
    formData.append('resume', optionalInfo.resume);

    axios.post('https://synk-job-portal-server.vercel.app/api/userdetails', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
      if (response.data.acknowledged) {
        alert('Details saved successfully');
        // Optionally refetch user details after successful submission
        axios.get('https://synk-job-portal-server.vercel.app/api/userdetails', { withCredentials: true })
          .then(response => {
            const { personalInfo, professionalInfo, optionalInfo } = response.data;
            setPersonalInfo(personalInfo || {
              name: '',
              dob: '',
              email: '',
              mobile: '',
              location: ''
            });
            setProfessionalInfo(professionalInfo || {
              totalExperience: '',
              currentOrganization: '',
              currentDesignation: '',
              currentCTC: ''
            });
            setOptionalInfo(optionalInfo || { resume: null, resumeURL: '' });
          })
          .catch(error => {
            console.error('Error fetching updated user details:', error);
          });

        // Fetch the updated resume URL
        axios.get('https://synk-job-portal-server.vercel.app/api/userdetails/resume', { withCredentials: true })
          .then(response => {
            setOptionalInfo(prevState => ({
              ...prevState,
              resumeURL: response.data.url
            }));
          })
          .catch(error => {
            console.error('Error fetching updated resume URL:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    });
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-8">
      <h1 className="text-center text-2xl font-bold mb-8">Personal Information</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Personal Details</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-lg">Name</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={personalInfo.name} 
                onChange={handlePersonalInfoChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block mb-2 text-lg">Date of Birth (mm/dd/yyyy)</label>
              <input 
                type="date" 
                name="dob" 
                value={personalInfo.dob} 
                onChange={handlePersonalInfoChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block mb-2 text-lg">Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={personalInfo.email} 
                onChange={handlePersonalInfoChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block mb-2 text-lg">Mobile Number</label>
              <input 
                type="tel" 
                name="mobile" 
                placeholder="Mobile Number" 
                value={personalInfo.mobile} 
                onChange={handlePersonalInfoChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-lg">Current Location</label>
              <input 
                type="text" 
                name="location" 
                placeholder="Current Location" 
                value={personalInfo.location} 
                onChange={handlePersonalInfoChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Professional Information</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block mb-2 text-lg">Total Experience</label>
              <input 
                type="text" 
                name="totalExperience" 
                placeholder="Total Experience" 
                value={professionalInfo.totalExperience} 
                onChange={handleProfessionalInfoChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block mb-2 text-lg">Current Organization</label>
              <input 
                type="text" 
                name="currentOrganization" 
                placeholder="Current Organization" 
                value={professionalInfo.currentOrganization} 
                onChange={handleProfessionalInfoChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block mb-2 text-lg">Current Designation</label>
              <input 
                type="text" 
                name="currentDesignation" 
                placeholder="Current Designation" 
                value={professionalInfo.currentDesignation} 
                onChange={handleProfessionalInfoChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
            <div>
              <label className="block mb-2 text-lg">Current CTC</label>
              <input 
                type="text" 
                name="currentCTC" 
                placeholder="Current CTC" 
                value={professionalInfo.currentCTC} 
                onChange={handleProfessionalInfoChange} 
                className="w-full p-2 border rounded" 
                required 
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Optional Information</h3>
          <div>
            <label className="block mb-2 text-lg">Upload Resume</label>
            <input 
              type="file" 
              name="resume" 
              onChange={handleOptionalInfoChange} 
              className="w-full p-2 border rounded" 
              required 
            />
          </div>
          {optionalInfo.resumeURL && (
            <div>
              <a
                href={optionalInfo.resumeURL}
                className="text-blue underline"
                download
              >
                Download Resume
              </a>
            </div>
          )}
        </div>

        <div className="text-center">
          <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded">
            Save Details
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
