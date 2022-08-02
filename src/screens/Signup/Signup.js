import React, { useState,useRef} from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import UserDataService from "../../firebase/userservice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/landscape-view.jpg"
import Input from "../../components/Input/Input";
import Default from "../Default.json";

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [usererrors,setuserErrors] = useState(false);
  const [emailerrors,setemailErrors] = useState(false);
  const navigate = useNavigate();
  const userrep = useRef('');
  const emailrep = useRef()

  let value = Default.Form;
  let {FirstName,LastName,Username,Email,Password,ConfirmPassword}=value

  const clearMassage = () =>{
    setTimeout(() => {setMessage({ error: false, msg: "" });
  }, 3000);}

/// Find username is already exist or not //
  const usernameChange =async (e)=>{
    setUsername(e.target.value)
    const userref = userrep.current.value
    const data =await  UserDataService.getAllUsers();
     data.docs.forEach((doc) => {
    const newdata = doc.data();
    if (newdata.username === userref){
       setuserErrors(true)
       setTimeout(()=>{
        setuserErrors( false);
          },3000)
          }
     })
}
/// Find email is already exist or not //
  const emailChange = async (e)=>{
    setEmail(e.target.value)
    const emailref=emailrep.current.value
    const data =await  UserDataService.getAllUsers();
     data.docs.forEach((doc) => {
    const newdata = doc.data();
    if (newdata.email === emailref){
      if(newdata.password === undefined){
      setMessage({ error: true, msg: "User Account already created" });
        clearMassage();
      } else{
        setemailErrors(true)
        setTimeout(()=>{
         setemailErrors( false);
           },3000)
      }
    }
     })
}
/// Signup form submit fn //
  const formsubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const newUser = {
      userId: Date.now(),
      firstname,
      lastname,
      username,
      email,
      password,
      status:"NA",
      role:"NA"
    };
    try {
      await UserDataService.addUsers(newUser);
      setMessage({ error: true, msg: "New USER added successfully!" });
      clearMassage();  
    } catch (err) {
      setMessage({ error: true, msg: err.message });
      clearMassage();
    }
    navigate("/");
    setFirstname("");
    setLastname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("")
  };

  return (
   <>
    <div className="sign_page">
      <div className="signup_header">
        {message.error ? <p>{message.msg}</p> : ""}
      </div>
      <div className="signup_home">
        <img src={logo} alt="plane" />
      </div>
      <div className="signup_form">
        <form className="row g-3" onSubmit={formsubmit}>
          <div className="col-md-6">
            <Input
              type={FirstName.type}
              className="form-control"
              id="firstname"
              label={FirstName.label}
              autoComplete="off"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <Input
              type={LastName.type}
              className="form-control"
              id="inputLname"
              autoComplete="off"
              label={LastName.label}
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label htmlFor="username" className="form-label">
            {Username.label}
            </label>
            <input
              type={Username.type}
              className="form-control"
              id="username"
              ref={userrep}
              autoComplete="off"
              value={username}
              onChange={usernameChange}
            />
            <small>{usererrors ? "Username already exist" : ""}</small>
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">
            {Email.label}
            </label>
            <input
              type={Email.type}
              className="form-control"
              id="email"
              autoComplete="off"
              ref={emailrep}
              value={email}
              onChange={emailChange}
            />
            <small>{emailerrors ? "Email already exist" : ""}</small>
          </div>
          <div className="col-12">
            <Input
              type={Password.type}
              className="form-control"
              id="Password"
              label={Password.label}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="col-12">
            <Input
              type={ConfirmPassword.type}
              className="form-control"
              id="confirmPassword"
              label={ConfirmPassword.label}
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Create an account
            </button>
          </div>
          <p>
            Already have an account?<Link to="/">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
   </>
  );
};
export default Signup;
