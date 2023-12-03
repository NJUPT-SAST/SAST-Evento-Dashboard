import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import TheLayout from "./pages/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Timetable from "./pages/Timetable";
import Picture from "./pages/Picture";
import Roles from "./pages/Roles";
import Page404 from "./pages/Page404";
import ImageList from "./pages/Image";
import Bind from "./pages/Bind";
import OAuth2 from "./pages/Oauth2";
// import Activity from './pages/Home/Activity';
// import Activity_roles from './pages/Home/Activity_roles';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <TheLayout/> */}
        <Routes>
          <Route path="/console" element={<TheLayout />}>
            <Route path="activity" element={<Home />}>
              {/* <Route path='activity' element={<Activity />}></Route>
              <Route path='activity-role' element={<Activity_roles />}></Route> */}
            </Route>
            <Route path="timetable" element={<Timetable />}></Route>
            <Route path="roles" element={<Roles />}></Route>
            <Route path="picture" element={<Picture />}></Route>
            <Route path="image" element={<ImageList />}></Route>
          </Route>
          <Route path="/console/login" element={<Login />}></Route>
          <Route path="/console/oauth2" element={<OAuth2 />}></Route>
          <Route path="/console/bind" element={<Bind />}></Route>
          <Route path="*" element={<Page404 />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
