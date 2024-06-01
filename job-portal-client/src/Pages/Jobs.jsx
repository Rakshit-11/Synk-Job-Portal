import React from 'react';

const Jobs = ({ result }) => {
  return (
    <>
      <div>
        <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
      </div>
      <section>
        {/* Map over the result array and render each item */}
        {result.map((job, index) => (
          <div key={index}>{job}</div>
        ))}
      </section>
    </>
  );
};

export default Jobs;
