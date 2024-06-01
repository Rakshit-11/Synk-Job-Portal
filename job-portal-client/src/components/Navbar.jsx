import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom'; 
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);  // Close the menu after logging out
  };
  const handleLogin = async () => {
    await login();
    window.location.reload();  // Reload the page after login
  };

  const navItems = [
    { path: "/", title: "Start a Search" },
    { path: "/my-jobs", title: "My Jobs" },
    { path: "/post-job", title: "Post A Job" },
  ];

  return (
    <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <nav className='flex justify-between items-center py-6'>
        <Link to="/">
          <img
            src="images/synk_logo.png"
            alt="synk logo"
            style={{ maxWidth: '150px', height: 'auto' }}
          />
        </Link>

        <ul className='hidden md:flex gap-12'>
          {navItems.map(({ path, title }) => (
            <li key={path} className='text-base text-primary'>
              <NavLink
                to={path}
                activeClassName="active"
                className="nav-link"
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className='text-base text-primary font-medium space-x-5 hidden lg:block'>
          {!currentUser ? (
            <>
              <Link to="/login" className='py-2 px-5 border rounded'> Log in </Link>
              <Link to="/sign-up" className='py-2 px-5 border rounded bg-gray-800 text-white'> Sign up </Link>
            </>
          ) : (
            <div className="relative inline-block text-left">
              <button className="py-2 px-5 border rounded" onClick={handleMenuToggler}>
                Profile
              </button>
              <div className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${isMenuOpen ? '' : 'hidden'}`}>
                <div className="py-1">
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className='md:hidden block'>
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? <AiOutlineClose className='w-5 h-5 text-primary' /> : <FaBars className='w-5 h-5 text-primary' />}
          </button>
        </div>
      </nav>

      <div className={`px-4 bg-white py-5 rounded-sm ${isMenuOpen ? '' : 'hidden'}`}>
        <ul>
          {navItems.map(({ path, title }) => (
            <li key={path} className='text-base text-primary'>
              <NavLink
                to={path}
                className="nav-link"
                onClick={handleMenuToggler}
              >
                {title}
              </NavLink>
            </li>
          ))}
          {!currentUser ? (
            <>
              <li className='text-gray-800 py-1'><Link to="/login"> Log in </Link></li>
              <li className='text-gray-800 py-1'><Link to="/sign-up"> Sign up </Link></li>
            </>
          ) : (
            <>
              <li className='text-gray-800 py-1'><Link to="/dashboard"> Dashboard </Link></li>
              <li className='text-gray-800 py-1'><button onClick={handleLogout}> Logout </button></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
