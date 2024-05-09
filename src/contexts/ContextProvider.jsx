import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setuser: () => {},
  setToken: () => {},
  header: {},
});

export const ContextProvider = ({ children }) => {
  const [user, setuser] = useState({});
  const [token, settoken] = useState(null);
  const [header, setheader] = useState({});
  const setToken = (token) => {
    settoken(token);

    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
      setheader({ headers: { Authorization: "Bearer " + token , 'Content-Type': 'multipart/form-data' } });
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setuser,
        setToken,
        header,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
