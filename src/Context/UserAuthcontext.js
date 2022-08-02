import { createContext, useContext,useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebasecon";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  
  const [userInfo,setUserInfo] = useState({initial:false,nameId :'',userId:'',location:''});
  const [crew,setCrew] = useState(false)
  const [trans,setTrans] = useState(false)
  const [isAuth,setIsAuth] =useState(false)
  const [usersId,setUsersid]=useState('');
  
  // const [crewId,setCrewId]=useState('');

  const getUserId=(id)=>{
        setUsersid(id);
      //  console.log(id);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  return (
    <userAuthContext.Provider
      value={{
        logIn,
        signUp,
        logOut,
        isAuth,
        setIsAuth,
        userInfo,
        setUserInfo,
        usersId,
        setUsersid,
        getUserId,
        crew,
        setCrew,
        trans,
        setTrans
       
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
