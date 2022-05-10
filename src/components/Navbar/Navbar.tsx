import React from 'react';
import Logo from '../../assets/img/clarifai-logo.jpeg';
import '../../assets/styles/tailwind.css';

export const Navbar = () => {
  return (
    <header className="relative bg-white z-20 flex-none mb-5 py-3 pl-5 pr-3 sm:pl-6 sm:pr-4 md:pr-3.5 lg:px-6 flex items-center space-x-4 antialiased border-b border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-3 py-2 flex-auto flex items-center min-w-0 space-x-6">
        <img className="relative mr-2 w-40" src={Logo} alt="clarifai-logo" id="logo" height="21px" />
      </div>
    </header>
  );
}
