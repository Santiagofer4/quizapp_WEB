import { Switch } from '@material-ui/core';
import { SideBarContext } from 'App';
import PropTypes from 'prop-types';
import React from 'react';

function ThemeToggler({ toggleTheme, checked }) {
  return (
    <Switch
      checked={checked === 'light' ? false : true}
      color="primary"
      onChange={() => toggleTheme()}
      name="themeToggler"
    />
  );
}

ThemeToggler.propTypes = {
  toggleTheme: PropTypes.func.isRequired,
  theme: PropTypes.string.isRequired,
};

export default ThemeToggler;
