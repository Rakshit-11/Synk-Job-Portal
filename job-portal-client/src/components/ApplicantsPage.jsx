import React, { useState, useEffect } from "react";

const ApplicantsPage = () => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    fetch("/candidate.json")
      .then(response => response.json())
      .then(data => setApplicants(data))
      .catch(error => console.error('Error fetching applicants:', error));
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Applicants</h1>
      <table style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(applicant => (
            <tr key={applicant.id}>
              <td>{applicant.id}</td>
              <td>{applicant.name}</td>
              <td>{applicant.email}</td>
              <td>{applicant.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsPage;
