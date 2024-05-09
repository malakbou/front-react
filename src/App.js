
// import './App.css'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom';


function App() {
 return(
  <div>
  <h1>heloo to our app </h1>
  {/* <Link to="/Home/calendar">new project</Link> */}
  <Link to="/create/project">new project</Link>

</div>

 )

}

export default App;













// import React from 'react';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import correct
// import { createRoutesFromElements } from "react-router-dom"; // Import correct

// import HomePage from './pages/HomePage';
// import DepartmentManagementPage from './pages/DepartmentManagementPage';
// import EmployeeManagementPage from './pages/EmployeeManagementPage';
// import Project from "./pages/Project";
// import Createproject from "./pages/Createproject";
// import Login from "./pages/Login";
// import Editproject from "./pages/Editproject";
// import Createtask from "./pages/Createtask";
// import Edittask from "./pages/Edittask";
// import Dashboard from "./pages/Dashboard";

// import Defaultlayout from "./Layouts/Defaultlayout";
// import Guestlayout from "./Layouts/Guestlayout";



// const App = () => (
//   <Router>
//     <Routes>
//       <Routes element={<Defaultlayout/>}>
//         <Route path="/Home/Calendar" element={<HomePage />} />
//         <Route path="/departements" element={<DepartmentManagementPage />} />
//         <Route path="/employees" element={<EmployeeManagementPage />} />
//         <Route path="/project" element={<Project />} />
//         <Route path="/project/create" element={<Createproject />}/>
//         <Route path="/Dashboard" element={<Dashboard/>}/> 
//         <Route path="/project/edit/:id" element={<Editproject />} />
//         <Route path="/task/create/:id" element={<Createtask />} /> 
//         <Route path="/task/edit/:id" element={<Edittask/>} /> 
        
//       </Routes>

//       <Routes element={<Guestlayout/>}>
//         <Route path="/login" element={<Login/>}/> 
//       </Routes>
//     </Routes>
//   </Router>
// );

// export default App;

