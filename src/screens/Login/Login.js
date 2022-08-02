import React, {  useState } from "react";
import  "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useUserAuth } from "../../Context/UserAuthcontext";
import UserDataService from"../../firebase/userservice";
import logo from "../../assets/landscape-view.jpg";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Default from "../Default.json";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const navigate = useNavigate();
  const { setUserInfo,setIsAuth,isAuth,setCrew,setTrans } = useUserAuth();
  let value = Default.Form;
    let {Username,Password}=value

  /// Clear notification messages /// 
  const clearMassage = () =>{
    setTimeout(() => {
    setMessage({ error: false, msg: "" });
  }, 3000);}

  /// Login form Submit ///
  const loginhandler =async (e) => {
    e.preventDefault();
    if (username==='visaga' && password ==='123456') {
      setUserInfo({initial:true , nameId:username})
      setIsAuth(!isAuth)
        navigate("/admin")
        return;
      }
   try {
    const data = await UserDataService.getAllUsers();
     data.docs.forEach((doc) => {
       const newdata = doc.data();
       // console.log(newdata);
       if (newdata.email === username) {
         if (newdata.password === password) {
           if (newdata.status === "Active") {
             if (newdata.role === "Crew Admin") {
              setUserInfo({initial:true , nameId:newdata.username})
              setCrew(true)
               setIsAuth(!isAuth)
               navigate("/admin/crew");
             } else if (newdata.role === "Transport Admin") {
              setUserInfo({initial:true , nameId:newdata.username})
              setTrans(true)
              setIsAuth(!isAuth)
               navigate("/admin/trans");
             }else if (newdata.role === "Crew Member") {
              setUserInfo({initial:true , nameId:newdata.username,userId:newdata.userId, location:newdata.location})
               navigate("/crewmember");
             }
             else if (newdata.role === "Transport Provider") {
              setUserInfo({initial:true , nameId:newdata.username, location:newdata.location})
               navigate("/transportprovider");
             }
             
             else {
               navigate("/");
             }
           } else {
             setMessage({ error: true, msg: "Account Status Inactive" });
             clearMassage();
           }
         } else {
           setMessage({ error: true, msg: "Password Wrong" });
           clearMassage();
         }
       }
     });
     
   } catch (err) {
    setMessage({ error: true, msg:'Username Invalid' });
    clearMassage();
   }
  };

  return (
   <>
    <div className="login_page">
      <div className="login_header">
        {message.error ? <p>{message.msg}</p> : ""}
      </div>
      <div className="login_home">
        <img src={logo} alt="image" />
      </div>
      <div className="login_form">
        <div className="login_head">
          <h4>CREW Login</h4>
        </div>
        <form onSubmit={loginhandler}>
          <div className="login_username">
            <i className="fa-solid fa-envelope"></i>
            <Input
              type={Username.type}
              placeholder={Username.label}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login_username">
            <i className="fa-solid fa-key"></i>
            <Input
              type={Password.type}
              placeholder={Password.label}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login_button">
            <Button type="submit" >
              <i className="fa-solid fa-arrow-right-to-bracket">&nbsp;&nbsp;</i>
              Login
            </Button>
          </div>
        </form>
        <div className="login_para">
          <p>Forgot Password?</p>
          <p>New User?</p>
        </div>
        <div className="login_button">
          <Link to="/signup">
            <button type="submit">
              Create new Account &nbsp;
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </Link>
        </div>
      </div>
    </div>
   </>
  );
};

export default Login;
