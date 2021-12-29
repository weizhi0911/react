import { useState, Suspense } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
// import Login from "../Login/index";

// import Routers from "../../routers";
// import { useNavigate, Outlet } from "react-router-dom";
function List(props: any) {
  const [msg, setMsg] = useState("123");
  let visionAssembly: any;
  const [list] = useState<{ name: string; value: string }[]>([
    {
      name: "待办事项",
      value: "/todo-list",
    },
    {
      name: "首页",
      value: "/",
    },
    {
      name: "登录页",
      value: "/login",
    },
  ]);
  let navigate = useNavigate();
  let location = useLocation();

  console.log(location);

  const goPath = (link: string) => {
    navigate(link);
  };

  const listFn = () => {
    return list.map((item, index) => (
      <div onClick={() => goPath(item.value)} key={index}>
        {item.name}
      </div>
    ));
  };

  if (location.pathname !== "/login") {
    visionAssembly = (
      <div>
        {listFn()}
        <p>{msg}</p>
        <button onClick={() => setMsg("3333")}>change</button>
        <Suspense fallback={<div>loading</div>}>
          <Link to="/">Home</Link>
        </Suspense>
      </div>
    );
  }
  return <div>{visionAssembly}</div>;
}

export default List;
