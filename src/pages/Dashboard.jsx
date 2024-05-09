import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


import { Link, Navigate } from "react-router-dom";

export default function Dashboard() {
  const [projects, SetProjects] = useState([]);
  const [clients, SetClients] = useState([]);
  const [client, SetClient] = useState([]);
  const [employes, SetEmployes] = useState([]);
  const [taches, SetTaches] = useState([]);
  const [filteroption, SetOption] = useState("project");
  const [search, Setsearch] = useState("");
  const [value, Setvalue] = useState(false);
  const [id, Setid] = useState();
  const [anchorEl, setAnchorEl] = useState(null);



  //load all datas
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/project/index").then((res) => {
      SetProjects(res.data.projets);
      console.log(res);
    });
    axios.get("http://127.0.0.1:8000/api/employes").then((res) => {
      SetEmployes(res.data.employes);
      console.log(res.data.employes);
    });
 
    axios.get("http://127.0.0.1:8000/api/client/index").then((res) => {
      SetClients(res.data.client);
      console.log(res);
    });
  }, []);

  //functionto display tasks
  const displaytasks=(e,val)=>{
    axios.get("http://127.0.0.1:8000/api/tache/show"+filteroption+"/"+val).then((res) => {
      SetTaches(res.data.tache);
      console.log(taches);

  });
  console.log(taches);
  console.log(value);
  console.log(e.currentTarget);
  setAnchorEl(e.currentTarget);
    }
  

      const handleClose = () => {
        setAnchorEl(null);
        SetTaches([]);
      };

    
      const open = Boolean(anchorEl);
      const idd = open ? 'simple-popover' : undefined;
  //fonction to load project table
  const setprojects = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>view of all projects</caption>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">TITRE</TableCell>
              <TableCell align="left">DEADLINE</TableCell>
              <TableCell align="left">RETARD</TableCell>
              <TableCell align="left">TASKS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.nom}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.deadline}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.retard===0 ?("false"):("true")}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>
                      <Typography
                        className="tasks-column"
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onClick={(ev) => displaytasks(ev, item.id)}
                      >
                        Tasks
                      </Typography>
                      <Popover
                        id={idd}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        disableRestoreFocus
                      >
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 300 }}
                            aria-label="caption table"
                          >
                            <caption>view of all tasks</caption>
                            <TableHead>
                              <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">NOM</TableCell>
                                <TableCell align="left">DEADLINE</TableCell>
                                <TableCell align="left">STATUS</TableCell>
                                <TableCell align="left">PRIORITE</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>{settaches()}</TableBody>
                          </Table>
                        </TableContainer>
                      </Popover>
                    </div>
                  </TableCell>
                 
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const setclients = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>view of all clients</caption>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">NOM</TableCell>
              <TableCell align="left">FONCTION</TableCell>
              <TableCell align="left">TELEPHONE</TableCell>
              <TableCell align="left">mail</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.nom}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.fonction}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.num_telf}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.mail}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const setemployes = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="caption table">
          <caption>view of all employes</caption>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="left">NOM</TableCell>
              <TableCell align="left">PRENOM</TableCell>
              <TableCell align="left">GRADE</TableCell>
              <TableCell align="left">TELEPHONE</TableCell>
              <TableCell align="left">MAIL</TableCell>
              <TableCell align="left">Tasks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employes.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.nom}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.prenom}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.role}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.telephone}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <div>
                      <Typography
                        className="tasks-column"
                        aria-owns={open ? "mouse-over-popover" : undefined}
                        aria-haspopup="true"
                        onClick={(ev) => displaytasks(ev, item.id)}
                      >
                        Tasks
                      </Typography>
                      <Popover
                        id={idd}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        disableRestoreFocus
                      >
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 300 }}
                            aria-label="caption table"
                          >
                            <caption>view of all tasks</caption>
                            <TableHead>
                              <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">NOM</TableCell>
                                <TableCell align="left">DEADLINE</TableCell>
                                <TableCell align="left">STATUS</TableCell>
                                <TableCell align="left">PRIORITE</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>{settaches()}</TableBody>
                          </Table>
                        </TableContainer>
                      </Popover>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const settaches = () => {
    return taches.map((item, index) => {
      return (
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
          {   filteroption==="employe" ?( 
            
               <TableCell component="th" scope="row">
      <select
      
          className="date"
          value={item.status}
          onChange={(ev)=>updatestatus(ev,item.id)}
        >
          <option >not assigned</option>
          <option >in progress</option>
          <option >completed</option>
        </select>
        </TableCell>
      ):(
        <TableCell component="th" scope="row">
            {item.status}
          </TableCell>
      )}
          <TableCell component="th" scope="row">
            {item.priorite}
          </TableCell>
        </TableRow>
      );
     
    });
  };

  const updatestatus=(e,st)=>{
    e.persist();
    // e.preventDefault
    const newStatus = e.target.value;
    console.log(newStatus);
    const data={status:newStatus};
    axios.post("http://127.0.0.1:8000/api/tache/updatestatus/"+st,data).then((res) => {
      console.log(res.data.tache);
      e.target.value=res.data.tache.status;
    });
  }

  const handleinput = (e) => {
    e.persist();
    SetOption(e.target.value);
    console.log(filteroption);
  };

  const handleinputsearch = (e) => {
    e.persist();
    Setsearch(e.target.value);
    console.log(search);
  };

  

  const Search = (e) => {
    e.preventDefault();
    const data = { search: search };
    if (filteroption === "project") {
      axios
        .post("http://127.0.0.1:8000/api/project/search", data)
        .then((res) => {
          SetProjects(res.data.project);
          console.log(res);
          Setsearch("");
        });
    } else {
      if (filteroption === "client") {
        axios
          .post("http://127.0.0.1:8000/api/client/search", data)
          .then((res) => {
            SetClients(res.data.client);
            console.log(res);
            Setsearch("");
          });
      } else {
        axios
          .post("http://127.0.0.1:8000/api/employe/search", data)
          .then((res) => {
            SetEmployes(res.data.employe);
            console.log(res);
            Setsearch("");
          });
      }
    }
  };
  return (
    <div>
      <form>
        <Link to="/project/create">create project</Link>
        <div className="search-items">
          <input
            className="input__field"
            type="text"
            placeholder="SEARCH"
            value={search}
            onChange={handleinputsearch}
          />
          <button onClick={Search} className="button--primary" label="search">
            search
          </button>
        </div>

        <select
          className="date"
          name="retard"
          value={filteroption}
          onChange={handleinput}
        >
          <option value="project">PROJECT</option>
          <option value="client">CLIENTS</option>
          <option value="employe">EMPLOYES</option>
        </select>
      </form>

      {filteroption === "project"
        ? setprojects()
        : filteroption === "client"
        ? setclients()
        : setemployes()}
    </div>
  );
}
