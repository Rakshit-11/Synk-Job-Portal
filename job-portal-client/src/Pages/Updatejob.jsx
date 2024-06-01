import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import axios from 'axios';

const Updatejob = () => {
  const { id } = useParams();
  const [jobData, setJobData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    axios.get(`https://synk-job-portal-server.vercel.app/all-jobs/${id}`, { withCredentials: true })
      .then(res => res.data)
      .then(data => {
        setJobData(data);
        setSelectedOption(data.skills); // Assuming 'skills' is an array
      })
      .catch(error => {
        console.error('Error fetching job data:', error);
      });
  }, [id]);

  const onSubmit = (data) => {
    data.skills = selectedOption;
    axios.patch(`https://synk-job-portal-server.vercel.app/edit-job/${id}`, data, { withCredentials: true })
      .then(res => res.data)
      .then((result) => {
        console.log(result);
        if (result.acknowledged === true) {
          alert('Job updated successfully');
        }
        reset();
      })
      .catch(error => {
        console.error('Error updating job:', error);
      });
  };

  const options = [
    { value: 'Javascript', label: 'Javascript' },
    { value: 'C++', label: 'C++' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'React', label: 'React' },
    { value: 'Node', label: 'Node' },
    { value: 'MongoDb', label: 'MongoDb' }
  ];

  if (!jobData) {
    return <div>Loading...</div>;
  }

  const { JobTitle, companyName, minPrice, maxPrice, salaryType, jobLocation, postingDate, experienceLevel, companyLogo, employmentType, description, postedBy, skills } = jobData;

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block mb-2 text-lg">Job Title</label>
            <input
              type="text"
              placeholder="Web Developer"
              defaultValue={JobTitle}
              {...register("JobTitle")}
              className="create-job-input w-3/4"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg">Company Name</label>
            <input
              type="text"
              placeholder="Ex: Microsoft"
              defaultValue={companyName}
              {...register("companyName")}
              className="create-job-input w-3/4"
            />
          </div>

          <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
            <div>
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input
                type="text"
                placeholder="10000"
                defaultValue={minPrice}
                {...register("minPrice")}
                className="create-job-input w-3/4"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input
                type="text"
                placeholder="100000"
                defaultValue={maxPrice}
                {...register("maxPrice")}
                className="create-job-input w-3/4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
            <div>
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} className="create-job-input">
                <option value={salaryType}>{salaryType}</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 text-lg">Job Location</label>
              <input
                type="text"
                placeholder="e.g Bengaluru"
                defaultValue={jobLocation}
                {...register("jobLocation")}
                className="create-job-input w-3/4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
            <div>
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input
                type="date"
                placeholder="e.g 2024-04-3"
                defaultValue={postingDate}
                {...register("postingDate")}
                className="create-job-input w-3/4"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg">Job Type</label>
              <select {...register("experienceLevel")} className="create-job-input">
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="NoExperience">Fresher</option>
                <option value="Internship">Mid-level</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-lg">Required skills</label>
            <CreatableSelect
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2">
            <div>
              <label className="block mb-2 text-lg">Company Logo</label>
              <input
                type="url"
                placeholder="Paste your company logo URL"
                defaultValue={companyLogo}
                {...register("companyLogo")}
                className="create-job-input w-3/4"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg">Employment Type</label>
              <select {...register("employmentType")} className="create-job-input">
                <option value={employmentType}>{employmentType}</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea
              className="w-full pl-3 py-1.5 focus:outline-none"
              rows={6}
              placeholder="Job description"
              defaultValue={description}
              {...register("description")}
            />
          </div>

          <div>
            <label className="block mb-2 text-lg">Job Posted by</label>
            <input
              type="email"
              placeholder="Your email"
              defaultValue={postedBy}
              {...register("postedBy")}
              className="create-job-input w-3/4"
            />
          </div>

          <input
            type="submit"
            className="block mt-12 bg-gray-800 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Updatejob;
