import React, { useState } from 'react';
import FlightDelayForm from './FlightDelayForm';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faHome, faInfoCircle, faBriefcase, faEnvelope, faClock, faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  const [showForm, setShowForm] = useState(false);

  // Function to close the form
  const closeForm = () => {
    setShowForm(false);
  };

  const navLinks = [
    { name: 'Home', icon: faHome },
    { name: 'About', icon: faInfoCircle },
    { name: 'Contact', icon: faEnvelope },
    { name: 'Members', icon: faUser },
  ];

  const teamMembers = ['Sahil', 'Brian', 'Marcus', 'Turjo', 'Phong', 'Soham'];
  const features = [
    {
      title: 'Real-Time Tracking',
      description: 'Stay updated with real-time flight data and delay predictions.',
      icon: faClock,
    },
    {
      title: 'Comprehensive Analysis',
      description: 'Get detailed insights and reports on flight patterns and delays.',
      icon: faChartLine,
    },
    {
      title: 'User-Friendly Interface',
      description: 'Enjoy a seamless experience with an intuitive and responsive design.',
      icon: faUser,
    },
  ];

  return (
    <div
      className="min-h-screen bg-black relative"
      style={{
        backgroundImage: 'url(https://images6.alphacoders.com/982/982770.png)', // Replace with desired background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-0"></div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 75 }}
        className="relative z-10 flex justify-between items-center px-8 py-4 bg-black bg-opacity-95 text-yellow-400 shadow-lg"
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faPlane} className="text-3xl animate-bounce" />
          <h1 className="text-3xl font-extrabold tracking-wide font-[Poppins]">
            SkyTrack
          </h1>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 font-Poppins text-lg font-medium">
          {navLinks.map((link, index) => (
            <motion.li
              key={index}
              className="relative group"
              whileHover={{ scale: 1.1 }}
            >
              <div className="relative group">
                <a
                  href={`#${link.name.toLowerCase()}`}
                  className="flex items-center space-x-2 px-6 py-2 rounded-full bg-yellow-400/10 backdrop-blur-lg hover:bg-yellow-400/20 transition duration-300"
                >
                  <FontAwesomeIcon icon={link.icon} className="text-xl text-yellow-400" />
                  <span className="text-yellow-400">{link.name}</span>
                </a>

                {/* Source Code Dropdown */}


                {/* Members Dropdown */}
                {link.name === 'Members' && (
                  <div className="absolute left-0 mt-2 w-48 bg-black text-yellow-400 rounded-lg shadow-lg overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 group">
                    {teamMembers.map((member, idx) => (
                      <motion.div
                        key={idx}
                        className="px-4 py-2 hover:bg-yellow-400 hover:text-black transition duration-300"
                      >
                        {member}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ul>

      </motion.nav>

      {/* Main Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center text-white px-4">
        {!showForm ? (
          <>
            {/* Main Heading */}
            <motion.h1
              className="text-7xl font-extrabold mb-6 leading-tight sm:text-5xl"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                ease: 'easeInOut',
                type: 'spring',
                stiffness: 100,
              }}
              style={{
                textShadow: '3px 5px 8px rgba(0, 0, 0, 0.9)',
              }}
            >
              Welcome to <span className="text-yellow-400">SkyTrack</span>
            </motion.h1>

            {/* Supporting Text */}
            <motion.p
              className="text-2xl font-light mb-10 tracking-wide sm:text-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,
                ease: 'easeOut',
              }}
              style={{
                textShadow: '2px 4px 5px rgba(0, 0, 0, 0.7)',
              }}
            >
              Your ultimate platform for managing and tracking flight delays!
            </motion.p>

            {/* Call-to-Action Button */}
            <motion.button
              onClick={() => setShowForm(true)}
              className="bg-yellow-400 text-black font-semibold px-10 py-5 rounded-full shadow-lg hover:bg-yellow-500 hover:scale-105 transition duration-300"
              whileHover={{
                scale: 1.2,
                boxShadow: '0px 0px 20px rgba(255, 255, 100, 0.8)',
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
            >
              Get Started
            </motion.button>


          </>
        ) : (
          <FlightDelayForm closeForm={closeForm} />
        )}
      </div>
    </div>
  );
}
