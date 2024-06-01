// UserJourneyBoxes.js

import React from 'react';

function UserJourneyBoxes() {
  return (
    <div className="flex justify-between max-w-screen-2x1 mx-auto py-8">
      <div className="flex-1 max-w-[30%] bg-gray-200 rounded-lg p-6 mr-6">
        {/* Box 1 content */}
        <h2 className="text-2xl font-semibold mb-4">Step 1</h2>
        <p>Discover Personalized Job Listings: Users find tailored job postings matching their skills and expertise for a customized browsing experience.</p>
      </div>
      <div className="flex-1 max-w-[30%] bg-gray-200 rounded-lg p-6 mr-6">
        {/* Box 2 content */}
        <h2 className="text-2xl font-semibold mb-4">Step 2</h2>
        <p>Easy Application: Users easily apply for jobs, completing a skill-based assessment to showcase their abilities.</p>
      </div>
      <div className="flex-1 max-w-[30%] bg-gray-200 rounded-lg p-6">
        {/* Box 3 content */}
        <h2 className="text-2xl font-semibold mb-4">Step 3</h2>
        <p>

        Quick Ranking: After the assessment, users are promptly ranked on the recruiter dashboard, giving recruiters insights into candidate skills and role fit, speeding up hiring.</p>
      </div>
    </div>
  );
}

export default UserJourneyBoxes;
