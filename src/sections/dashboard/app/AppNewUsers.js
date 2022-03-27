// material
import {Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// component
import Iconify from '../../../components/Iconify';

import { RootStyle, IconWrapperStyle } from './styles/AppNewUserStyle';

const TOTAL = 1352831;

export default function AppNewUsers() {
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Iconify icon="ant-design:apple-filled" width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        New Users
      </Typography>
    </RootStyle>
  );
}
