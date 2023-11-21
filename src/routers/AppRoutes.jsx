import { publicRoutes } from "./publicRoutes";
import { useRoutes } from "react-router-dom";

const AppRoutes = () => {
  const routes = publicRoutes;
  const element = useRoutes([...routes]);
  return <>{element}</>;
};

export default AppRoutes;
