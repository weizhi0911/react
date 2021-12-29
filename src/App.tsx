import { Suspense } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Routers from "./routers";
import List from "./view/List/index";
function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>loading</div>}>
        <BrowserRouter>
          <List />

          <Routes>
            {Routers.map((router: any) => (
              <Route
                key={router.path}
                path={router.path}
                element={<router.component />}
              ></Route>
            ))}
            {/* 重定向*/}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
