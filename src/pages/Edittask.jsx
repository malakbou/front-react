import { useState,useEffect } from "react";
import axios from "axios";
// import './create.css'
import { useNavigate, useParams } from 'react-router-dom';



export default function Edittask(){
    let{id}=useParams();
    const navigate=useNavigate();
  const [employe,SetEmploye]=useState([]);
  const [taches,SetTaches]=useState({});
  const [errors,SetError]=useState([]);
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/api/employes/index').then(res=>{
        
           SetEmploye(res.data.employes);
        });
   },[])
 
   useEffect(()=>{
    axios.get('http://127.0.0.1:8000/api/tache/show/'+id).then(res=>{

       SetTaches(res.data.taches);
       console.log(taches);

    });

},[])

const handleoutput=employe.map((item,index)=>{
    return(

    <option key={index} label={item.nom} value={item.id}>
        {item.id}
  </option>
    )
});

const handleinput=(e)=>{
    e.persist();
  SetTaches({...taches,[e.target.name]:e.target.value});
  }
  
  const submit=(e)=>{
    e.preventDefault();
    console.log('helloooooooo');
    const data={
      nom :taches.nom,
      description :taches.description,
       datefin : taches.datefin,
      status : taches.status,
      priorite : taches.priorite ,
      employe_id : taches.employe_id,
     
    }
    axios.put('http://127.0.0.1:8000/api/tache/update/'+id, data).then(res=>{
     alert(res.data.message);
      console.log(res.data.tache);
      navigate("/task/create/"+res.data.tache.projet_id)
    }).catch(function(error){
      if(error.response.status===422){
  SetError(error.response.data.ERRORS)
  //console.log(errors);
   }else{

    navigate("/task/create/"+id)
      }
     
    });
  
   
  }

    return(
<form onSubmit={submit}>
<div  className="modal">
            <div className="modal__header">
              <span className="modal__title">edit Task:{taches.nom}</span>
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
                <select className="date"  name="status" value={taches.status} onChange={handleinput} defaultValue={"not assigned"} >
                  <option >not assigned</option>
                  <option>in progress</option>
                  <option>completed</option>
                </select>
                <span>{errors.status}</span>
              </div>
              <div className="input">
                <label className="input__label" >PRIORITE</label>
                <select className="date"  name="priorite" value={taches.priorite} onChange={handleinput} defaultValue={"not normal"} >
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
              <button className="button button--primary"  onClick={submit}>Update task</button>
            </div>
              </div>
</form>

    )
}