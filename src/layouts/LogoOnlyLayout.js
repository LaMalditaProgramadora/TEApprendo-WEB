import { Outlet } from 'react-router-dom';
// components
import Logo from '../components/Logo';
import {HeaderStyle} from "./styles/LogoOnlyLayoutStyle";

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      <Outlet />
    </>
  );
}
