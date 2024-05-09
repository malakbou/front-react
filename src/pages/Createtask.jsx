import 'dayjs/locale/en-gb';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Createproject from "./Createproject";
import { useState,useEffect } from "react";
import axios from "axios";
// import './create.css'
import { useNavigate, useParams } from 'react-router-dom';
export default function Createtask(){
  let{id}=useParams();
  const navigate=useNavigate();
const [employe,SetEmploye]=useState([]);
const [errors,SetError]=useState([]);
const [projet,SetProjet]=useState([]);
const [tache,SetTache]=useState([]);
const [hide,SetHide]=useState(false);
const [taches,SetTaches]=useState({
    nom :"",
    description : "",
    datefin : "",
    status : "",
    priorite : "",
    employe_id : "",
});

 useEffect(()=>{
     axios.get('http://127.0.0.1:8000/api/employes').then(res=>{
     
        SetEmploye(res.data.employes);
     });

     axios.get('http://127.0.0.1:8000/api/tache/showproject/'+id).then(res=>{

     SetTache(res.data.tache);
     console.log(tache);

  });

  axios.get('http://127.0.0.1:8000/api/project/show/'+id).then(res=>{
  
  SetProjet(res.data.project);
});

},[])




 
const drop=(ev,val)=>{
  ev.preventDefault();
  axios.delete('http://127.0.0.1:8000/api/tache/delete/'+val).then(res=>{
  alert("res.data.message");
  window.location.reload();

});


}


const handleoutput=employe.map((item,index)=>{
    return(

    <option key={index} label={item.nom} value={item.id}>
        {item.id}
  </option>
    )
});

const handleout=tache.map((item,index)=>{
    return(

        <TableRow key={index}>
        <TableCell component="th" scope="row">
          {item.id}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.nom}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.datefin}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.status}
        </TableCell>
        <TableCell component="th" scope="row">
          {item.priorite}
        </TableCell>
        <TableCell component="th" scope="row">
          <button className="edit-button" onClick={ev=>navigate('/task/edit/'+item.id)}>
            <svg className="edit-svgIcon" viewBox="0 0 512 512">
              <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
            </svg>
           
          </button>
        </TableCell>
        <TableCell component="th" scope="row">
          <button className="delete-button"  onClick={(e)=>drop(e,item.id)}>
            <svg className="delete-svgIcon" viewBox="0 0 448 512">
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
            </svg>
          </button>
        </TableCell>
      </TableRow>
    
    )
});


const handleinput=(e)=>{
   
  e.persist();
SetTaches({...taches,[e.target.name]:e.target.value});
}

const submit=(e)=>{
  e.preventDefault();
  const data={
    nom :taches.nom,
    description :taches.description,
    datefin : taches.datefin,
    status : taches.status,
    priorite : taches.priorite ,
    employe_id : taches.employe_id,
   
  }
  console.log(id);
  axios.post('http://127.0.0.1:8000/api/tache/store/'+id, data).then(res=>{
   alert(res.data.message);
    window.location.reload();
  }).catch(function(error){
    if(error.response.status===422){
SetError(error.response.data.ERRORS)
 }else{
    }
   
  });

 
}






    return (
    <div>
      {hide &&  <form >
        <div  className="modal">
            <div className="modal__header">
              <span className="modal__title">New Task</span>
            </div>
            <div className="modal__body">
              <div className="input">
                <label className="input__label"> title</label>
                <input className="input__field" type="text" name="nom" value={taches.nom} onChange={handleinput} />
              <span>{errors.nom}</span>
              </div>
              <div className="input">
                <label className="input__label">Description</label>
                <textarea className="input__field input__field--textarea" name="description" value={taches.description} onChange={handleinput}></textarea>
                <span>{errors.description}</span>
                <p className="input__description">
                  Give your project a good description so everyone know what's
                  it for
                </p>
              </div>
              <div className="input">
        <input type="Date" className='date' placeholder="deadline " name="datefin" onChange={handleinput} value={taches.datefin}   />
      <span>{errors.deadline}</span>
</div>
<div className="input">
                <label className="input__label" >Etat</label>
                <select className="date"  name="status" value={taches.status} onChange={handleinput}  >
                <option >none</option>
                  <option >not assigned</option>
                  <option>in progress</option>
                  <option>completed</option>
                </select>
                <span>{errors.status}</span>
              </div>
              <div className="input">
                <label className="input__label" >PRIORITE</label>
                <select className="date"  name="priorite" value={taches.priorite} onChange={handleinput}  >
                <option >none</option>
                  <option >normal</option>
                  <option> urgent</option>
                  <option>faible</option>
                </select>
                <span>{errors.priorite}</span>
              </div>
              <div className="input">
              <label className="input__label">Employe</label>
                <select className="date" name="employe_id" value={taches.employe_id} onChange={handleinput} >
                  <option>none</option>
                   {handleoutput}
                </select>
                <span>{errors.employe_id}</span>
              </div>

            </div>
            <div className="modal__footer">
              <button className="button button--primary"  onClick={submit}>Create task</button>
            </div>
        </div>
       </form>}
      <div>
      <button className='button_addproject'   onClick={ev=>SetHide(true)}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        aria-hidden="true"
      >
          <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
          stroke="#fffffff"
          strokeWidth="2"
        ></path>
        <path
          d="M17 15V18M17 21V18M17 18H14M17 18H20"
          stroke="#fffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      
      </svg>
      ADD task
    </button>
   
       
        <div className="modal__header">
          <span className="modal__title">{projet.nom}</span>
        </div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="caption table">
            <caption>view of all tasks</caption>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="left">TITRE</TableCell>
                <TableCell align="left">DEADLINE</TableCell>
                <TableCell align="left">Etat</TableCell>
                <TableCell align="left">PRIORITE</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{handleout}</TableBody>
          </Table>
        </TableContainer>
         </div>
      </div>
    )
 
}