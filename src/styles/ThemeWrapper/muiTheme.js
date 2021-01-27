export const muiTheme = {
  light: {
    themeName: 'light',
    typography: {
      useNextVariants: true,
      fontFamily: [
        'Roboto',
        'Lato',
        '"Helvetica Neue"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      type: 'light',
      primary: {
        main: '#cfd8dc',
        light: '#ffffff',
        dark: '#9ea7aa',
        // dark: '#1A6035',
        // light: '#536B6F',
        // light: '#e8dab2',
        // main: '#eaeaea',
        // dark: '#4f6d7a',
        // buttons: '#e1e1e1',
        // contrastText: '#4f6d7a',
      },
      secondary: {
        main: '#00838f',
        light: '#4fb3bf',
        dark: '#005662',
        // dark: '#aca9bb',
        // light: '#4f6d7a',
        // main: '#e8dab2',
        // dark: '#c15e5e',
      },
      error: {
        light: '#e57373',
        main: '#f44336',
        dark: '#d32f2f',
        contrastText: '#fff',
      },
      warning: {
        light: '#ffb74d',
        main: '#ff9800',
        dark: '#f57c00',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      info: {
        light: '#64b5f6',
        main: '#2196f3',
        dark: '#1976d2',
        contrastText: ' #fff',
      },
      success: {
        light: '#81c784',
        main: '#4caf50',
        dark: '#388e3c',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
  dark: {
    themeName: 'custom dark',
    typography: {
      useNextVariants: true,
      fontFamily: [
        'Roboto',
        'Lato',
        '"Helvetica Neue"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
    palette: {
      type: 'dark',
      primary: {
        main: '#536B6F',
        // main: '#1e004a',
        // buttons: '#424242',
        // contrastText: '#f7f7f7',
      },
      secondary: {
        main: '#FFF7D6',
        dark: '#f7f7f7',
        // light: '#0066ff',
        // main: '#090046',
        // dark: 'black',
      },
    },
  },
};

export default muiTheme;
