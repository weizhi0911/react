import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./index.sass";

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
        <div className="tabs">{listFn()}</div>
        <p>msg:{msg}</p>
        <button onClick={() => setMsg("3333")}>change msg</button>
        <div>
          link标签登录： <Link to="/">Home</Link>
        </div>
      </div>
    );
  }
  return <div>{visionAssembly}</div>;
}

export default List;
