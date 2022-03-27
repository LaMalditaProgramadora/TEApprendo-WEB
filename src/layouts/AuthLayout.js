import PropTypes from 'prop-types';
// material
import { Typography } from '@mui/material';
// components
import Logo from '../components/Logo';
import { HeaderStyle} from "./styles/AuthLayoutStyle";

AuthLayout.propTypes = {
  children: PropTypes.node
};

export default function AuthLayout({ children }) {
  return (
    <HeaderStyle>
      <Logo />

      <Typography
        variant="body2"
        sx={{
          display: { xs: 'none', sm: 'block' },
          mt: { md: -2 }
        }}
      >
        {children}
      </Typography>
    </HeaderStyle>
  );
}
