import 'dayjs/locale/en-gb';
import { useState,useEffect } from "react";
import axios from "axios";
import Input from '@mui/material/Input';
// import './create.css'
import { useNavigate, useParams } from 'react-router-dom';
import Createtask from './Createtask';

export default function Editproject(){
  let{id}=useParams();
  const navigate=useNavigate();
  const [employe,SetEmploye]=useState([]);
const [errors,SetError]=useState([]);
const [projets,SetProjet]=useState({
});
useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/employe/indexchef').then(res=>{
    
       SetEmploye(res.data.employes);
    });
},[])

const handleoutput=employe.map((item,index)=>{
   return(

   <option key={index} label={item.nom} value={item.id}> 
 </option>
   )
});
 useEffect(()=>{
     axios.get('http://127.0.0.1:8000/api/project/show/'+id).then(res=>{
     console.log(res)
        SetProjet(res.data.project);
     });
},[])



const handleinput=(e)=>{
  e.persist();
SetProjet({...projets,[e.target.name]:e.target.value});
}

const submit=(e)=>{
  e.preventDefault();
  console.log('helloooooooo');
  const data={
    nom :projets.nom,
    description :projets.description,
     livrable : projets.livrable,
    objectif : projets.objectif,
    deadline : projets.deadline, 
    retard : projets.retard,
    chef_id : projets.chef_id,
  }
  
  axios.put('http://127.0.0.1:8000/api/project/update/'+id, data).then(res=>{
   alert(res.data.message);
   console.log(res);   
   navigate("/project");

  }).catch(function(error){
    if(error.response.data.status===422){
SetError(error.response.data.ERRORS)
//console.log(errors);
 }else{

  alert(error.response.data.message)  ;
    
      console.log(error.response.data);    }
  });
  }
 

    return (
        <div className="container">
          <div className="modal">
            <div className="modal__header">
              <span className="modal__title">Edit project:{projets.nom}</span>
            </div>
            <div className="modal__body">
              <div className="input">
                <label className="input__label">Project title</label>
                <input className="input__field" type="text" name="nom" value={projets.nom} onChange={handleinput} />
              <span>{errors.nom}</span>
              </div>
              <div className="input">
                <label className="input__label">Description</label>
                <textarea className="input__field input__field--textarea" name="description" value={projets.description} onChange={handleinput}></textarea>
                <span>{errors.description}</span>
                <p className="input__description">
                  Give your project a good description so everyone know what's
                  it for
                </p>
              </div>
              <div className="input">
                <label className="input__label">Livrable</label>
                <input className="input__field" type="text" name="livrable" value={projets.livrable} onChange={handleinput} />
                <span>{errors.livrable}</span>
              </div>
              <div className="input">
                <label className="input__label">Objectifs</label>
                <textarea className="input__field input__field--textarea" name="objectif" value={projets.objectif} onChange={handleinput}></textarea>
                <span>{errors.objectif}</span>
              </div>
              <div className="input">
      
                    <input type="Date" className='date' placeholder="deadline" name="deadline" onChange={handleinput} value={projets.deadline}   />
                    <span>{errors.deadline}</span>
              </div>
              <div className="input">
                <label className="input__label" >Retard</label>
                <select className="date"  name="retard" value={projets.retard} onChange={handleinput} >
                  <option>0</option>
                  <option>1</option>
                </select>
                <span>{errors.retard}</span>
              </div>
             
              <div className="input">
              <label className="input__label">Chef de projet</label>
                <select className="date" name="chef_id" value={projets.chef_id} onChange={handleinput} >
                
                   {handleoutput}
                </select>
                <span>{errors.chef_id}</span>
              </div>
            </div>
       {<Createtask/>}
            <div className="modal__footer">
              <button className="button button--primary"  type='submit' onClick={submit}>update project</button>
            </div>
          </div>
        </div>
    );
    }