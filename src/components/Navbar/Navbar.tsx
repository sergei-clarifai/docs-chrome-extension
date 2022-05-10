import React from 'react';
import { Settings } from '../../components/Icons/Settings';
import Logo from '../../assets/img/clarifai-logo.jpeg';
import '../../assets/styles/tailwind.css';

export const Navbar = () => {
  return (
    <header
      className="relative bg-white z-20 flex-none mb-5 py-4 flex items-center antialiased border-b border-gray-200"
      style={{
        position: 'sticky',
        top: 0,
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-10 flex-auto flex items-center justify-between min-w-0 space-x-6">
        <img className="relative mr-2 w-40" src={Logo} alt="clarifai-logo" id="logo" height="21px" />


        <a href="/options.html">
          <button
            type="button"
            className="flex py-2.5 px-3 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <Settings className='mr-1' color='darkgrey' />
            Configure Settings
          </button>
        </a>
      </div>
    </header>
  );
}
