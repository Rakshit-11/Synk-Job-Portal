import { useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import axios from 'axios'

const CreateJob = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    axios.post("http://localhost:5000/post-job", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // Ensure cookies are sent with the request
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.acknowledged === true) {
          alert("Job posted successfully");
        }
        reset();
      })
      .catch((error) => {
        console.error('Error posting job:', error);
      });
  };

  const options = [
    { value: "Javascript", label: "Javascript" },
    { value: "C++", label: "C++" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "React", label: "React" },
    { value: "Node", label: "Node" },
    { value: "MongoDb", label: "MongoDb" },
  ];

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 py-8">
      <h1 className="text-2xl font-semibold mb-8 text-center">Create Job</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-lg">Job Title</label>
            <input
              type="text"
              placeholder="Web Developer"
              {...register("JobTitle")}
              className="w-full p-2 border rounded" 
            />
          </div>
          <div>
            <label className="block mb-2 text-lg">Company Name</label>
            <input
              type="text"
              placeholder="Ex: Microsoft"
              {...register("companyName")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-lg">Minimum Salary</label>
            <input
              type="text"
              placeholder="10000"
              {...register("minPrice")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg">Maximum Salary</label>
            <input
              type="text"
              placeholder="100000"
              {...register("maxPrice")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-lg">Salary Type</label>
            <select {...register("salaryType")} className="w-full p-2 border rounded">
              <option value="">choose your salary type</option>
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
              {...register("jobLocation")}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-lg">Job Posting Date</label>
            <input
              type="date"
              placeholder="e.g 2024-04-3"
              {...register("postingDate")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg">Job Type</label>
            <select {...register("experienceLevel")} className="w-full p-2 border rounded">
              <option value="">choose experience Level</option>
              <option value="NoExperience">Fresher</option>
              <option value="Internship">Mid-level</option>
              <option value="Yearly">Senior</option>
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
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-lg">Company Logo</label>
            <input
              type="url"
              placeholder="Paste your company logo URL"
              {...register("companyLogo")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg">Employment Type</label>
            <select {...register("employmentType")} className="w-full p-2 border rounded">
              <option value="">choose employment type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Temporary">Temporary</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-lg">Job Description</label>
          <textarea
            className="w-full p-2 border rounded"
            rows={6}
            placeholder="Job description"
            {...register("description")}
          />
        </div>

        <div>
          <label className="block mb-2 text-lg">Job Posted by</label>
          <input
            type="email"
            placeholder="Your email"
            {...register("postedBy")}
            className="w-full p-2 border rounded"
          />
        </div>

        <input
          type="submit"
          className="block mt-8 bg-gray-800 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
        />
      </form>
    </div>
  );
};

export default CreateJob;
