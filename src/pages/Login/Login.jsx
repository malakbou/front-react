import axios from "axios";
import { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import login from "./Login.module.css";
import { colors } from "@material-ui/core";


export default function Login() {
  const navigate = useNavigate();
  const { setuser, setToken } = useStateContext();
  const [username, Setusername] = useState("");
  const [password, Setpassword] = useState("");
  const [errors, Seterrors] = useState([]);
  const submit = (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:8000/api/auth/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res.data.token);
        setuser(res.data.user);
        setToken(res.data.token);

        Setusername("");
        Setpassword("");
      })
      .catch(function (error) {
        if (error.response.data.status === 422) {
          Seterrors(error.response.data.ERRORS);
        } else {
          console.log(error.response.data.message);
          alert(error.response.data.message);
        }
      });
  };
  return (
    <body className={login.body}>
      <div className={login.container}>
        <div className={login.group}>
          <img src="/images/Group.png" alt="Description de l'image"></img>
        </div>
        <div className={login.vector}>
          <img src="/images/vector.png" alt="Description de l'image"></img>
        </div>
        <div className={login.auth}>
          <form onSubmit={submit}>
            <div className="container">
              <div className="modal">
                <div className={login.header_login}>
                  <span className={login.description_login}>votre nouvel allié pour une gestion efficace des tâches et des projets. </span>
                </div>
                <div className={login.input_body}>
                  <div className="input">
                    <input
                      className={login.input_field}
                      type="text"
                      placeholder="Nom d'utilisateur"
                      name="username"
                      value={username}
                      onChange={(ev) => Setusername(ev.target.value)}
                    />
                    <span className={login.error_uername}>{errors.username}</span>
                  </div>
                  <div className={login.input_password}>
                    <input
                      className={login.input_field}
                      type="text"
                      placeholder="Mot de passe"
                      name="password"
                      value={password}
                      onChange={(ev) => Setpassword(ev.target.value)}
                    />
                    <span className={login.error_password}>{errors.password}</span>
                  </div>
                </div>
                <div className={login.authentifier}>
                  <button className={login.btn_login} type="submit">
                    S'inscrire{" "}
                  </button>
                </div>
                <div className={login.text_btn_box}> 
                <span className={login.text_btn}> En m’inscrivant, j’adhère à la Politique de confidentialité et aux conditions de service .</span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </body>
  );
}
