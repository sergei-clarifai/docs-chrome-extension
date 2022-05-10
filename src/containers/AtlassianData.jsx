import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import parse from 'html-react-parser';
import { IconInfo } from '../components/Icons/IconInfo';
import { atlassianSearchContent, atlassianSearch } from '../utils/atlassian';
import { getFileById } from '../utils/drive';
import { useGoogle } from './GoogleDriveFiles';

export const AtlassianData = () => {
  const [items, setItems] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const driveReady = useGoogle();

  useEffect(() => {
    if (!driveReady ) return;
    atlassianSearchContent('777191487?expand=body.storage').then((contentData) => {
      console.log('atlassianSearchContent contentData:', contentData);
      const content = contentData.body.storage.value;
      const div = document.createElement('div');
      div.innerHTML = content;
      
      const newItems = Array.from(div.querySelectorAll('tr')).filter((tr) => tr.querySelectorAll('td').length).map((tr, idx) => {
        const tds = Array.from(tr.querySelectorAll('td'));
        

        const linkToPage = tds[0].querySelector('a');
        const linkToDrive = tds[2].querySelector('a');
        let googleId;
        const found = linkToDrive ? linkToDrive.innerHTML.match(/drive\.google\.com\/file\/d\/([^//]+)\/view/) : null;
        if (found && found.length) {
          googleId = found[1];
          console.log('atlassianSearchContent linkToDrive:', idx, googleId);

          
          getFileById(googleId).then((fileResponse) => {
            setThumbnails((oldThumbnails) => ({
              ...oldThumbnails,
              [googleId]: fileResponse.result,
            }));
            console.log('atlassianSearchContent getFile:', idx, fileResponse);
          }).catch((err) => {
            console.log('atlassianSearchContent ERROR:', idx, err);
          });

        }
        
        const newItem = {
          linkToPage,
          linkToDrive,
          googleId,
          title: tds[0].innerText,
          description: tds[1].innerHTML,
          driveLink: tds[2],
        };
        return newItem;
      });

      setItems(newItems);

      console.log('atlassianSearchContent newItems:', newItems)
    });


    // atlassianSearch('cql=type=blogpost%20and%20space=FRON&expand=space,title,content,history,body.view,metadata.labels')
    //   .then(data => {
    //     // addItems(data.results);

    //     console.log('atlassianSearchContent data:', data);
      
        
    //     atlassianSearch('cql=type=page%20AND%20label=feforum')
    //       .then(data => {
    //         const links = data.results;
    //         links.reverse();

    //         console.log('atlassianSearchContent links:', links);
    //       });
    //   });
  }, [driveReady]);
  
  return (
    <>
      {items.map(({ title, description, googleId }) => (
        <div className={cx('card', { 'has-preview': googleId && thumbnails?.[googleId]?.thumbnailLink })}>
          <div className="title-wrapper flex justify-between">
            <h3 className='title'>{title}</h3>
            <IconInfo className='info-icon' color="darkgrey" />
          </div>
          {/* <div>{description && parse(description)}</div> */}
          {(googleId && thumbnails[googleId] && thumbnails[googleId].thumbnailLink) ? (
            <img
              src={thumbnails[googleId].thumbnailLink}
              alt={title}
              className='rounded-lg'
            />
          ) : <div className='rounded-lg default-placeholder' />}
        </div>
      ))}
    </>
  );

}