import { lazy } from "react"; // 路由懒加载
const Todolist = lazy(() => import("../view/Todolist"));
const Home = lazy(() => import("../view/Home"));
const Login = lazy(() => import("../view/Login"));
// const Detail = lazy(() => import ('../pages/detail'))

export type RouterType = {
  path: string;
  component: React.LazyExoticComponent<any>;
  root: string[];
  notExect?: boolean;
  redirectTo?: string;
}[];

const Routers: RouterType = [
  {
    path: "/todo-list",
    component: Todolist,
    root: [],
    // redirectTo: "/",
  },
  {
    path: "/",
    component: Home,
    root: [],
    // redirectTo: "/",
  },
  {
    path: "/login",
    component: Login,
    root: [],
    // redirectTo: "/",
  },
];

export default Routers;
