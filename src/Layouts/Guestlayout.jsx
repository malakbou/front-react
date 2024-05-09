import {Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";


export default function Guestlayout(){
    const {token}=useStateContext();
    if(token){
        // return <Navigate to="/employes"/> 
        return <Navigate to="profile"/>  
    }
    return(
        <div>
            <Outlet/>
        </div>
    )
}
// departements
// /EmployeeManagementPage
// Home/Calendar