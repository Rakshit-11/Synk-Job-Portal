import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import Home from './Pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Applicants from './Pages/Applicants';
import CreateJob from './Pages/CreateJob';
import JobDetail from './Pages/JobDetail';
import Jobs from './Pages/Jobs';
import MyJobs from './Pages/MyJobs';
import Updatejob from './Pages/Updatejob';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './Pages/Dashboard';



function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container mx-auto">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            
            <Route path="/post-job" element={<CreateJob />} />
            <Route path="/my-jobs" element={<MyJobs />} />
            <Route path="/edit-job/:id" element={<Updatejob />} />
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/view-applicants/:id' element={<Applicants/>} />
          </Route>

          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/jobs" element={<Jobs />} />
          
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
