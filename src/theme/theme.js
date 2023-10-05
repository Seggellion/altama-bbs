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
      },
      font: {
        family: `'Courier New', Courier, monospace`,
      },
      edgeSize: {
        small: '14px',
      },
    },
    text: {
      extend: {
        fontFamily: `'Lucida Console', Monaco, monospace`,
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
        fontFamily: `'Lucida Console', Monaco, monospace`,
      },
    },
  });

  export default customTheme;
