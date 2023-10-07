import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';

const customTheme = deepMerge(grommet, {
  global: {
    colors: {
      brand: '#444444',
      'accent-1': '#FFCC00',
      'light-1': '#f0f0f0',
      'light-2': '#d6d6d6',
      focus: 'transparent', // Disable Grommet's default focus ring
      'background': '#000000', // Black background
      'text': '#DDDDDD' // Off-white text
    },
    font: {
      family: 'MSDOS, monospace', // Use custom font
      fontSize: '12px'
    },
    edgeSize: {
      small: '14px',
    },
  },
  text: {
    extend: {
      fontFamily: 'MSDOS, Monaco, monospace', // Use custom font
    },
  },
  button: {
    border: {
      radius: '0',
    },
    padding: {
      horizontal: '20px',
      vertical: '10px',
    },
    extend: {
      fontFamily: 'MSDOS, Monaco, monospace', // Use custom font
    },
  },
  box: {
    background: 'black', // set the default background color for boxes to black
  },
  nav: {
    a: {
      color: 'white', // set the default color for hyperlinks to white
      textDecoration: 'none', // remove underline from hyperlinks
    },
  },
});

export default customTheme;
