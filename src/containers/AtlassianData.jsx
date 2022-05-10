import React, { useState, useEffect, useCallback } from 'react';
import cx from 'classnames';
import parse from 'html-react-parser';
import { IconInfo } from '../components/Icons/IconInfo';
import { atlassianSearchContent, atlassianSearch } from '../utils/atlassian';
import { getFileById } from '../utils/drive';
import { useGoogle } from './GoogleDriveFiles';

export const AtlassianData = () => {
  const [items, setItems] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const [createdBy, setCreatedBy] = useState({});
  const [createdDate, setCreatedDate] = useState({});
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
        
        console.log('atlassianSearchContent tds:', idx, tds.map((td) => td.innerHTML));
        const foundTitle = tds[0].innerHTML.match(/ri:content-title="(.*?)"/);
        console.log('atlassianSearchContent foundTitle:', idx, foundTitle);

        if (foundTitle && foundTitle.length) {
          const contentTitle = foundTitle[1];
          atlassianSearch(`cql=title="${contentTitle.replaceAll(' ', '+')}"&expand=space,title,content,history,body.view,metadata.labels`).then((r) => {
            console.log('atlassianSearchContent DATA:', idx, r.results);
            if (r.results.length && r.results[0]) {
              console.log('atlassianSearchContent DATA:', idx, r.results[0].history.createdBy);
              setCreatedBy((oldState) => ({
                ...oldState,
                [idx]: r.results[0].history.createdBy,
              }));
              setCreatedDate((oldState) => ({
                ...oldState,
                [idx]: new Date(r.results[0].history.createdDate).toLocaleDateString(),
              }));
            }
          }).catch((e) => {
            console.log('atlassianSearchContent atlassianSearch ERROR:', idx, e);
          })
        }

        const linkToPage = tds[0].querySelector('a');
        const linkToDrive = tds[2].querySelector('a');
        let googleId;
        const found = linkToDrive ? linkToDrive.innerHTML.match(/drive\.google\.com\/file\/d\/([^//]+)\/view/) : null;
        if (found && found.length) {
          googleId = found[1];

          getFileById(googleId).then((fileResponse) => {
            setThumbnails((oldThumbnails) => ({
              ...oldThumbnails,
              [googleId]: fileResponse.result,
            }));
          }).catch((err) => {
            console.log('atlassianSearchContent ERROR:', idx, err);
          });

        }
        
        const newItem = {
          idx,
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

  const formatDate = useCallback((dateTimestamp) => {
    // source: https://stackoverflow.com/a/69737382
    // The Swedish locale uses the format "yyyy-mm-dd":
    const dateFormatter = Intl.DateTimeFormat('sv-SE');
    return dateFormatter.format(dateTimestamp);
  }, []);
  
  return (
    <>
      {items.map(({ title, description, googleId, idx }) => (
        <div className={cx('card', { 'has-preview': googleId && thumbnails?.[googleId]?.thumbnailLink })}>
          <div className="title-wrapper flex justify-between">
            <h3 className='title'>{title}</h3>
            <IconInfo className='info-icon' color="darkgrey" />
          </div>

          <div className='creator-info'>
            {createdBy[idx] && (
              <div className='flex items-end'>
                <img
                  src={`https://clarifai.atlassian.net${createdBy[idx].profilePicture.path}`}
                  alt={createdBy[idx].publicName}
                  className='avatar h-10 w-10'
                />
                <div className="flex flex-col">
                  <span className='name black'>{createdBy[idx].publicName}</span>
                  <span className='date black'>{createdDate[idx]}</span>
                </div>
              </div>
            )}
          </div>

          {/* <div>{description && parse(description)}</div> */}
          {(googleId && thumbnails[googleId] && thumbnails[googleId].thumbnailLink) ? (
            <img
              src={thumbnails[googleId].thumbnailLink}
              alt={title}
              className='preview rounded-lg'
            />
          ) : <div className='rounded-lg default-placeholder' />}
        </div>
      ))}
    </>
  );

}