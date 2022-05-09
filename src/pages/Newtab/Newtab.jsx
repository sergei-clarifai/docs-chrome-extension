import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar';
import { GithubFiles } from '../../containers/GithubFiles';
import { GoogleDriveFiles } from '../../containers/GoogleDriveFiles';
import { CarouselList } from '../../components/CarouselList/CarouselList';
import './Newtab.css';
import './Newtab.scss';


const Newtab = () => {
  return (
    <>
      <Navbar />
      <div className='relative max-w-7xl px-3 mx-auto'>
        <GoogleDriveFiles
          category="Engineering"
          heading="Engineering Goodies - Season #1"
          description="All episodes of Clarifai's Engineering Goodies in 2021"
          folderIds={['1bviyV6Gh3cFppFNu4hC5MQoCi2pas502']}
        />

        <GoogleDriveFiles
          category="Engineering"
          heading="Engineering Goodies - Season #2"
          description="All episodes of Clarifai's Engineering Goodies in 2022"
          folderIds={['1ugZjUFj2JM2Y4rOBHH9byVaOceaH3CyJ']}
        />

        <GithubFiles />
      </div>
    </>
  );
};

export default Newtab;
