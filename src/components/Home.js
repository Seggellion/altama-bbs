import React, { useEffect, useState } from 'react';
import Ansi from 'ansi-to-react';

const Home = () => {
  const [ansiContent, setAnsiContent] = useState('');

  useEffect(() => {
    // Fetch ANSI file and update state
    fetch('/altama_bbs_graphic.ans')
      .then((response) => response.text())
      .then((text) => setAnsiContent(text));
  }, []);

  return (
    <div>
      <Ansi>{ansiContent}</Ansi>
    </div>
  );
};

export default Home;
