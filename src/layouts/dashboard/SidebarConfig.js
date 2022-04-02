// component
import Iconify from "../../components/Iconify";

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: "Dashboard",
    path: "/dashboard/app",
    icon: getIcon("eva:pie-chart-2-fill"),
  },
  {
    title: "Perfil del niño",
    path: "/dashboard/childProfile",
    icon: getIcon("tabler:mood-kid"),
  },
  {
    title: "Observaciones",
    path: "/dashboard/observation",
    icon: getIcon("ic:outline-description"),
  },
  {
    title: "Cerrar sesión",
    path: "/login",
    icon: getIcon("eva:log-out-fill"),
  },
];

export default sidebarConfig;
