import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/all-jobs/${id}`);
        console.log(response.data)
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/userdetails', { withCredentials: true });
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        if (userDetails) {
          const response = await axios.get(`http://localhost:5000/api/applicants/${id}`, { withCredentials: true });
          const applicants = response.data;
          const userHasApplied = applicants.some(applicant => applicant.userId === userDetails.userId);
          setHasApplied(userHasApplied);
        }
      } catch (error) {
        console.error('Error checking if user has applied:', error);
        setError('Error checking if user has applied');
      }
    };
  
    checkIfApplied();
  }, [id, userDetails]);
  
  const handleApply = async () => {
    try {
      if (hasApplied) {
        alert('You have already applied for this job.');
      } else {
        await axios.post('http://localhost:5000/api/apply-job', { 
          jobId: id,
          userId: userDetails.userId,
          personalInfo: userDetails.personalInfo,
          professionalInfo: userDetails.professionalInfo,
          resume: userDetails.optionalInfo.resume
        }, {
          withCredentials: true,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        alert('Application submitted successfully');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      setError('Error applying for job. Please try again.');
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!job) {
    return <div>No job found</div>;
  }
  return (
    <div className="w-full max-w-screen-lg mx-auto lg:px-6 px-4 mt-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img src={job.companyLogo} alt={job.companyName} className="h-20 w-20 rounded-full mr-4" />
            <div>
              <h1 className="text-2xl font-bold">{job.JobTitle}</h1>
              <p className="text-gray-600">{job.companyName}</p>
            </div>
          </div>
          
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Job Details</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold">Job Location</h3>
            <p className="text-gray-600">{job.jobLocation}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Employment Type</h3>
            <p className="text-gray-600">{job.employmentType}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Experience Level</h3>
            <p className="text-gray-600">{job.experienceLevel}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Salary</h3>
            <p className="text-gray-600">{`${job.minPrice}k - ${job.maxPrice}k /${job.salaryType}`}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Posting Date</h3>
            <p className="text-gray-600">{new Date(job.postingDate).toLocaleDateString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Skills</h3>
            {Array.isArray(job.skills) ? (
              <ul className="text-gray-600">
                {job.skills.map((skill, index) => (
                  <li key={index}>{skill.label}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">{job.skills}</p>
            )}
          </div>
          
        </div> 
        
        <div className="flex justify-center">
          <button onClick={handleApply} className="mt-6 px-4 py-2 bg-gray-800 text-white rounded">
            Apply
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default JobDetail;
