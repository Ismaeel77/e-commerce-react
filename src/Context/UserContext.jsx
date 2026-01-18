import { useEffect, useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export let UserContext = createContext("");

export default function UserContextProvider(props) {
  let [userLogin, setUserLogin] = useState(null);
  useEffect(()=>{
    if (localStorage.getItem('userToken') !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserLogin(localStorage.getItem('userToken'))
    }
  }, [])
  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
