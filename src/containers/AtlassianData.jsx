import React, { useState, useEffect } from 'react';
import { atlassianSearchContent, atlassianSearch } from '../utils/atlassian';
import { getFileById } from '../utils/drive';
import parse from 'html-react-parser';

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
      {
        items.map(({ title, description, googleId }) => <div
          style={{
            display: 'flex',          
            flexDirection: 'column',
            boxSizing: 'border-box',
            justifyContent: 'space-between',
            fontWeight: 600,
            color: '#333',
            textDecoration: 'none',
            flexBasis: '25%',
          }}
        >
          <h3>{ title }</h3>
          {/* <div>{description && parse(description)}</div> */}
          <div>googleId: {googleId ? googleId : 'NULL'}</div>
        </div>)
      }
    </>
  );

}