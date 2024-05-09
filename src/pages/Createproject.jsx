import 'dayjs/locale/en-gb';
import { useState,useEffect } from "react";
import axios from "axios";


import { useNavigate } from 'react-router-dom';
export default function Createproject(){
  const navigate=useNavigate();


const [employe,SetEmploye]=useState([]);
const [errors,SetError]=useState([]);
const [projets,SetProjet]=useState({
    nom :"",
    description : "",
    livrable : "",
    objectif : "",
    deadline : "", 
    retard : "",
    nom_client : "",
    fonction : "",
    num_telf : "",
    mail : "",
    chef_id : "",
});

 useEffect(()=>{
     axios.get('http://127.0.0.1:8000/api/employe/indexchef').then(res=>{
     
        SetEmploye(res.data.employes);
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
  SetError([null]);
  e.persist();
SetProjet({...projets,[e.target.name]:e.target.value});
}

const submit=(e)=>{
  e.preventDefault();
  const data={
    nom :projets.nom,
    description :projets.description,
    livrable : projets.livrable,
    objectif : projets.objectif,
    deadline : projets.deadline, 
    retard : projets.retard,
    nom_client: projets.nom_client,
    fonction : projets.fonction,
    num_telf : projets.num_telf,
    mail : projets.mail,
    chef_id : projets.chef_id,
  }
  
  axios.post('http://127.0.0.1:8000/api/project/store', data).then(res=>{
    console.log(res.data.username);
    console.log(res.data.password);
    navigate('/task/create/'+res.data.project.id)
  
  }).catch(function(error){
    if(error.response.data.status===422){
SetError(error.response.data.ERRORS)
// console.log(error.response.data.ERRORS);

 

    }else{
      alert(error.response.data.message);
    
      // console.log(error.response.data);
    }
  });

}
    return (
      <form onSubmit={submit}>
        <div className="container">
          <div className="modal">
            <div className="modal__header">
              <span className="modal__title">New project</span>
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
                  <option value={0}>none</option>
                  <option>0</option>
                  <option>1</option>
                </select>
                <span>{errors.retard}</span>
              </div>
              <div className="input">
                <label className="input__label">Nom client</label>
                <input className="input__field" type="text" name="nom_client" value={projets.nom_client} onChange={handleinput} />
                <span>{errors.nom}</span>
              </div>
              <div className="input">
                <label className="input__label">Fonction</label>
                <input className="input__field" type="text" name="fonction" value={projets.fonction} onChange={handleinput} />
                <span>{errors.fonction}</span>
              </div>
              <div className="input">
                <label className="input__label">Telephone</label>
                <input className="input__field" type="text" name="num_telf" value={projets.num_telf} onChange={handleinput}/>
                <span>{errors.num_telf}</span>
              </div>
              <div className="input">
                <label className="input__label">Mail</label>
                <input className="input__field" type="text" name="mail" value={projets.mail} onChange={handleinput}/>
                <span>{errors.mail}</span>
              </div>
              <div className="input">
              <label className="input__label">Chef de projet</label>
                <select className="date" name="chef_id" value={projets.chef_id} onChange={handleinput} >
                  <option>none</option>
                   {handleoutput}
                </select>
                <span>{errors.chef_id}</span>
              </div>
            </div>
            <div className="modal__footer">
              <button className="button button--primary"  type='submit'>Create project</button>
            </div>
          </div>
        </div>
      </form>
    );
}