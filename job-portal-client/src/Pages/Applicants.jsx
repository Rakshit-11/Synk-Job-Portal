import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Applicants = () => {
  const { id } = useParams(); // Assuming the route parameter is named `id`
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://localhost:5000/api/applicants/${id}`, { withCredentials: true });
          console.log('Fetched applicants:', response.data); // Debug log
          setApplicants(response.data);
        }
      } catch (error) {
        console.error('Error fetching applicants:', error);
        setError(error.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Applicants for the Job</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <div key={applicant.id} className="bg-white shadow-md rounded-md p-4">
              <h2 className="text-xl font-semibold mb-2">{applicant.personalInfo.name}</h2>
              <p className="text-gray-600 mb-4">Email: {applicant.personalInfo.email}</p>
              <p className="text-gray-600 mb-4">Professional Experience: {applicant.professionalInfo.totalExperience} years</p>
              <p className="text-gray-600 mb-4">Current Organization: {applicant.professionalInfo.currentOrganization}</p>

              
              <div className="flex justify-between">
                
                <button 
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
                  onClick={() => window.open(applicant.resumeUrl, '_blank')}
                >
                  Download Resume
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No applicants found for this job.</p>
        )}
      </div>
    </div>
  );
};

export default Applicants;
