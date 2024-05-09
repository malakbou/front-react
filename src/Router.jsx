import { Route, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import React from "react";
import Createproject from "./pages/Createproject";
import App from "./App";
import HomePage from './pages/Calendre/HomePage';
import Project from "./pages/Project";
import Editproject from "./pages/Editproject";
import Createtask from "./pages/Createtask";
import Edittask from "./pages/Edittask";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login/Login";
import Defaultlayout from "./Layouts/Defaultlayout";
import Guestlayout from "./Layouts/Guestlayout";
import DepartmentManagementPage from './pages/DepartmentManagementPage';
import EmployeeManagementPage from './pages/EmployeeManagementPage';
import Profile from './pages/Profile/profile';



const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route element={<Defaultlayout />}>
      <Route path="/Home/Calendar" element={<HomePage />} />
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/project" element={<Project />} />
      <Route path="/project/create" element={<Createproject />} />
      <Route path="/project/edit/:id" element={<Editproject />} />
      <Route path="/task/create/:id" element={<Createtask />} />
      <Route path="/task/edit/:id" element={<Edittask/>} />

      <Route path="/profile" element={<Profile/>} />

      <Route path="/departements" element={<DepartmentManagementPage />} />
      <Route path="/EmployeeManagementPage" element={<EmployeeManagementPage />} />
      </Route>
      <Route element={<Guestlayout/>}>
      <Route path="/login" element={<Login/>}/>
      </Route>
     
     </Route>
  )
);
export default Router;







// import { Route, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
// import React from "react";
// import Createproject from "./pages/Createproject";
// import App from "./App";
// import HomePage from './pages/HomePage';
// import Project from "./pages/Project";
// import Editproject from "./pages/Editproject";
// import Createtask from "./pages/Createtask";
// import Edittask from "./pages/Edittask";
// import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";
// import Defaultlayout from "./Layouts/Defaultlayout";
// import Guestlayout from "./Layouts/Guestlayout";
// import DepartmentManagementPage from './pages/DepartmentManagementPage';
// import EmployeeManagementPage from './pages/EmployeeManagementPage';



// const Router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route>
//     <Route  element={<Defaultlayout />}>
//       <Route path="/Home/Calendar" element={<HomePage />} />
//       <Route path="/Dashboard" element={<Dashboard/>}/>
//       <Route path="/project" element={<Project />} />
//       <Route path="/project/create" element={<Createproject />} />
//       <Route path="/project/edit/:id" element={<Editproject />} />
//       <Route path="/task/create/:id" element={<Createtask />} />
//       <Route path="/task/edit/:id" element={<Edittask/>} />

//       <Route path="/departements" element={<DepartmentManagementPage />} />
//       <Route path="/employees" element={<EmployeeManagementPage />} />
//       </Route>
//       <Route element={<Guestlayout/>}>
//       <Route path="/login" element={<Login/>}/>
//       </Route>
     
//      </Route>
//   )
// );
// export default Router;