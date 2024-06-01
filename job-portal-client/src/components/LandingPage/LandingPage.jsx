import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; 
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import UserJourneyBoxes from './UserJourneyBoxes';
import FrequentlyAsked from './FrequentlyAsked';

function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Jobs" },
  ];

  return (
    <div>
      <header className='max-w-screen-2x1 container mx-auto xl:px-24 px-4 py-6'>
        <nav className='flex justify-between items-center'>
          <Link to="/">
            <img
              src="images/synk_logo.png"
              alt="synk logo"
              style={{ maxWidth: '150px', height: 'auto' }}
              className="md:hidden"
            />
            <img
              src="images/synk_logo.png"
              alt="synk logo"
              style={{ maxWidth: '150px', height: 'auto' }}
              className="hidden md:block"
            />
          </Link>

          <ul className='hidden md:flex gap-12 ml-auto font-semibold' style={{ marginLeft: '19cm' }}>
            {navItems.map(({ path, title }) => (
              <li key={path} className='text-base text-primary'>
                <NavLink
                  to={path}
                  activeClassName="active"
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
            <Link to="/login" className='py-2 px-5 border rounded'>Login as Candidate</Link>
            <Link to="/sign-up" className='py-2 px-5 border rounded bg-gray-800 text-white'>Login as Recruiter</Link>
          </div>

          <div className='md:hidden'>
            <button onClick={handleMenuToggler}>
              {isMenuOpen ? <AiOutlineClose className='w-5 h-5 text-primary'/> : <FaBarsStaggered className='w-5 h-5 text-primary'/>}
            </button>
          </div>
        </nav>

        <div className={`px-4 bg-white oy-5 rounded-sm ${isMenuOpen ? '' : 'hidden'}`}>
          <ul>
            {navItems.map(({ path, title }) => (
              <li key={path} className='text-base text-primary'>
                <NavLink
                  to={path}
                  isActive={(match, location) => location.pathname === path}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {title}
                </NavLink>
              </li>
            ))}
            <li className='text-gray-800 py-1'><Link to="/login">Log in</Link></li>
          </ul>
        </div>
      </header>

      <div className='max-w-screen-2x1 container mx-auto xl:px-24 md:py-20 py-14 flex flex-col items-center'>
        <h1 className='text-5xl font-bold text-primary mb-3'>Find jobs with companies that<span className='text-blue'> care about your skills</span></h1>
        <p className="text-5xl font-bold text-primary mb-8">More than your resume or college pedigree.</p>
        <p className='text-xl'>Unlocking Talent Beyond Resumes: Let Skills Speak Louder with Our AI-Powered Hiring Platform</p>
        <div className='text-base text-primary font-medium space-x-5 hidden lg:block mt-8'>
          <Link to="/login" className='py-2 px-5 border bg-gray-800 text-white rounded'>Sign up</Link>
        </div>
      </div>

      <div className="mb-16 text-center"> {/* Center the text */}
        <h1 className='text-4xl font-semibold mb-8'>Empowering Recruiters to Discover True Talent Through Skill-Based Assessments</h1>
        <UserJourneyBoxes/>
      </div>

      {/* our mission */}
      <div className="max-w-screen py-8 text-center" style={{ paddingLeft: '2cm', paddingRight: '2cm' }}>
        <h2 className="text-4xl font-semibold mb-4 mx-auto">Our Mission</h2>
        <p className="text-lg mx-auto ">
          We are a dedicated job portal committed to revolutionizing the hiring process. Our platform streamlines the job search journey for candidates, connecting them with opportunities that align with their skills and expertise. Simultaneously, we empower companies to discover top talent efficiently, saving valuable time and resources. Our mission is to bridge the gap between talented candidates and forward-thinking companies, fostering mutually beneficial connections that drive success.
        </p>
      </div>
      <div>
        <FrequentlyAsked/>
      </div>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-screen-2x1 container mx-auto flex justify-between items-center">
          <div>
            <Link to="/">
              <img
                src="images/synk_logo.png"
                alt="synk logo"
                style={{ maxWidth: '150px', height: 'auto' }}
              />
            </Link>
            <p className="mt-2">Connecting talent with opportunities.</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">Quick Links</h4>
            <ul className="mt-2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;