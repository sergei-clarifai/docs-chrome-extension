import React from 'react';
import { IconSettings } from '../Icons/IconSettings';
import '../../assets/styles/tailwind.css';

export const Navbar = ({ isOptions }) => {
  return (
    <header
      className="relative bg-slate-300 dark:bg-slate-900 z-20 flex-none mb-5 py-4 flex items-center antialiased border-b border-gray-200 dark:border-slate-700"
      style={{
        position: 'sticky',
        top: 0,
      }}
    >
      <div className="max-w-screen-2xl mx-auto px-10 flex-auto flex items-center justify-between min-w-0 space-x-6">
        <img
          className="relative mr-2 w-40 dark:block light:hidden"
          src="https://www.clarifai.com/hubfs/logo/Clarifai/Logo-Public-Sector.svg"
          alt="clarifai-logo"
          id="logo"
          height="21px"
        />
        
        {isOptions ? (
          <a href="/newtab.html">
            <button
              type="button"
              className="flex py-2.5 px-3 mr-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-blue-700 dark:hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
              <IconSettings className='mr-1' color='darkgrey' />
              Go Back
            </button>
          </a>
        ) : (
          <a href="/options.html">
            <button
              type="button"
              className="flex py-2.5 px-3 mr-2 text-sm font-medium text-gray-900 dark:text-white focus:outline-none bg-white dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-blue-700 dark:hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-200"
            >
              <IconSettings className='mr-1' color='darkgrey' />
              Configure Settings
            </button>
          </a>
        )}
      </div>
    </header>
  );
}
