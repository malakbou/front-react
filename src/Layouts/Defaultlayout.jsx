import { Link,Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import Sidebar from "./../pages/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar"; 
import axios from "axios";


export default function Defaultlayout(){
    const {user,token,header,setToken}=useStateContext();
    console.log(token);
    if(! token){
        console.log(token);
        return <Navigate to="/login"/>
    }
     
    const logout=(e)=>{
        e.preventDefault();
        console.log(user);
        console.log(header);
        axios.get("http://127.0.0.1:8000/api/auth/logout", header).then(res=>{
          console.log(res);
          setToken(null);
        });
      }


    return(
        <div>
            {/* <Navbar />
            <Sidebar /> */}
            <Link onClick={logout}>logout</Link>
               {user.username}
            <Outlet/>
        </div>
    )
}