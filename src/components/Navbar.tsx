import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const checkScreenSize = () => {
    setIsLargeScreen(window.innerWidth >= 1024); 
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  
    const handleScroll = () => {
      if (showDialog) {
        setShowDialog(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showDialog]);

  const toggleDialog = () => {
    setShowDialog(!showDialog);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const handlePosts = () => {
    navigate('/myblogs');
  };

  const goHome=()=>{
    navigate('/blogs');
  }

  return (
    <div className="App">
      <header className="bg-slate-300 text-bold p-4 flex justify-between items-center relative">
        <h1 className="text-3xl">Blog Freedom</h1>
        <div className="relative">
          <div className="user-logo" onClick={toggleDialog}>
            {isLargeScreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-8 w-8 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </div>
          {showDialog && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:rounded-lg font-black-500 text-black" onClick={goHome}>Home</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:rounded-lg font-black-500 text-black" onClick={handlePosts}>Posts</button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-200 hover:rounded-lg text-black flex justify-between" onClick={handleLogout}>Logout <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
</svg>
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
