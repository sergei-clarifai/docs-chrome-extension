import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { GithubFiles } from '../../containers/GithubFiles';
import { GoogleDriveFiles } from '../../containers/GoogleDriveFiles';

import { AtlassianData } from '../../containers/AtlassianData';

import './Newtab.css';
import './Newtab.scss';


const SliderContainer = ({children, category, title, description}) => (
  <div className='flex flex-col w-full mb-12'>
    <p className="text-sm leading-6 font-semibold text-sky-500">{category}</p>
    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">{title}</h2>
    <p className="mt-1 mb-4 text-lg text-slate-700 dark:text-slate-500">{description}</p>
    <div className='block w-full overflow-scroll' id="slider-row">
      <div className='flex gap-2'>
        {children}
      </div> 
    </div>
  </div>
);

const Newtab = () => {
  return (

    <div className='box-border pb-20'>
      <Navbar />
      <div className='max-w-screen-2xl mx-auto px-10 relative z-10'>
        <SliderContainer
          title={'Front End Forum'}
          category="frontendforum"
          description="All topics of Front-end Forum"
        >
          <AtlassianData />
        </SliderContainer>
        <SliderContainer
          category="engineering"
          title={'Engineering Goodies Season #4'}
          description="All episodes of Clarifai's Engineering Goodies in late 2022"
        >
          <GoogleDriveFiles folderIds={['1H1ZbBNa8uDkeHUbXNfHFa-i3SQkdOv4J']} />
        </SliderContainer>
        <SliderContainer
          category="github"
          title={'New portal documentaion'}
          description="All topics regrding how to develop new portal"
        >
          <GithubFiles />
        </SliderContainer>
      </div>

      <div
        className="inset-0 bg-bottom bg-no-repeat bg-slate-50 dark:bg-[#0B1120] index_beams__3fKa4"
        style={{
          backgroundSize: '150rem',
          position: 'fixed',
          // backgroundImage: 'url(https://tailwindcss.com/_next/static/media/hero@75.4dea7abe609fc522c039fba7662ceea2.jpg)',
        }}
      >
        <div
          className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.05] bg-[bottom_1px_center]"
          style={{
            maskImage:'linear-gradient(to bottom, transparent, black)',
          }}
        ></div>
      </div>

    </div>
  );
};

export default Newtab;
