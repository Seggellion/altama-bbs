import React, { useEffect, useState } from 'react';

const Home = () => {
  const [ansiContent, setAnsiContent] = useState('');

  useEffect(() => {
    // Dynamically load ansilove.js
    const script = document.createElement('script');
    script.src = '/js/ansilove.js'; // Adjust the path as needed
    script.onload = () => {
      // The script has loaded, now fetch the ANSI file
      if (window.AnsiLove) {
        console.log("AnsiLove loaded:", window.AnsiLove);

        fetch('/assets/altama_bbs_graphic.ans')
          .then((response) => response.arrayBuffer())
          .then((buffer) => {
            const options = { retina: false };
            const canvas = window.AnsiLove.render(buffer, options);
            setAnsiContent(canvas);
          })
          .catch((error) => {
            console.log("Error fetching ANSI file:", error);
          });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup: Remove the script when the component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      {ansiContent}
    </div>
  );
};

export default Home;
