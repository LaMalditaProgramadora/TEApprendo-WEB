import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from "@mui/material/styles";
// material
import {Typography } from '@mui/material';

Logo.propTypes = {
  sx: PropTypes.object
};

const TypographyStyle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Public Sans,sans-serif;',
  fontSize: 24 ,
  fontWeight: 900,
  color: '#035B9D'
}));

export default function Logo({ sx }) {
  return (
    <RouterLink to="/" style={{textDecoration: 'none'}}>
      <TypographyStyle>TEApp</TypographyStyle>
    </RouterLink>
  );
}
