import React, { useEffect, useState } from 'react';
import Ansi from 'ansi-to-react';

const Home = () => {
    const [ansiContent, setAnsiContent] = useState('');
  
    useEffect(() => {
      console.log("Fetching ANSI file...");
      
      fetch('/altama_bbs_graphic.ans')
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then((text) => {
          console.log("Successfully fetched ANSI file.");
          setAnsiContent(text);
        })
        .catch((error) => {
          console.log("Error fetching ANSI file:", error);
        });
    }, []);
  
    console.log("Rendering ANSI content:", ansiContent);
  
    return (
      <div>
        <Ansi>{ansiContent}</Ansi>
      </div>
    );
  };
  

export default Home;