import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import AddRemove from 'components/AddRemove';
import ComboFilter from './ComboFilter';
import CountryFilter from './CountryFilter';
import { PropTypes } from 'prop-types';
import { capitalize } from '../../../utils/helpers';

const FilterBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-grow: 1;
  margin-top: 1rem;
`;

const ContentBox = styled(Box)`
  margin-bottom: 0.75rem;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.palette.primary.light};
`;

function FilterGroup({ title, children }) {
  console.log('childrens', children);
  const [open, setOpen] = useState(false);
  const handleShow = (state) => {
    if (state) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  return (
    <>
      <FilterBox>
        <Title>{capitalize(title)}</Title>
        <AddRemove action={handleShow} />
      </FilterBox>
      <ContentBox>{open ? children : null}</ContentBox>
    </>
  );
}

export default FilterGroup;

FilterGroup.propTypes = {
  title: PropTypes.string.isRequired,
  option: PropTypes.element.isRequired,
};
