import React, { useEffect, useState } from 'react';


const Home = () => {
    const [ansiContent, setAnsiContent] = useState('');
  
    useEffect(() => {
        console.log("ansilove object:", window.ansilove);
      // Assume ansilove is a global object exposed by ansilove.js
      // If it's not global, you might need to import it differently
      const ansilove = window.ansilove;
  
      fetch('/assets/altama_bbs_graphic.ans')  // Updated the fetch URL
        .then(response => response.text())
        .then(text => {
          const renderedAnsi = ansilove.render(text, { /* your options here */ });
          setAnsiContent(renderedAnsi);
        });
    }, []);
  
    return (
      <div>
        {/* Display the rendered ANSI. This will depend on how ansilove.js renders the ANSI. */}
        <div dangerouslySetInnerHTML={{ __html: ansiContent }}></div>
      </div>
    );
  };
  

export default Home;
