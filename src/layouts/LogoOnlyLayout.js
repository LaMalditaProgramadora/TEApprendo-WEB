import { Outlet } from "react-router-dom";
// components
import Logo from "../components/Logo";
import { HeaderStyle } from "./styles/LogoOnlyLayoutStyle";

const LogoOnlyLayout = () => {
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      <Outlet />
    </>
  );
};

export default LogoOnlyLayout;
