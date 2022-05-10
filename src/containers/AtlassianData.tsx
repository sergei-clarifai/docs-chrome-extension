import React, { useState, useEffect } from 'react';
import { atlassianSearchContent, atlassianSearch } from '../utils/atlassian';
import parse from 'html-react-parser';

export const AtlassianData = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    atlassianSearchContent('777191487?expand=body.storage').then((contentData) => {
      console.log('atlassianSearchContent contentData:', contentData);
      const content = contentData.body.storage.value;
      const div = document.createElement('div');
      div.innerHTML = content;
      
      const newItems = Array.from(div.querySelectorAll('tr')).filter((tr) => tr.querySelectorAll('td').length).map((tr, idx) => {
        const tds = Array.from(tr.querySelectorAll('td'));
        console.log('atlassianSearchContent newItems:', idx, tds[1].children)

        const linkToPage = tds[0].querySelector('a');
        const linkToDrive = tds[2].querySelector('a');
        const newItem = {
          linkToPage,
          linkToDrive,
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
  }, []);
  
  return (
    <>
      {
        items.map(({ title, description }) => <div
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
          <div>{description && parse(description)}</div>
        </div>)
      }
    </>
  );

}