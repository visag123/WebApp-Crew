import React, { useState,useEffect ,useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import  "./EditCrew.css";
import Default from "../../Default.json";
import Input from '../../../components/Input/Input';
import UserDataService from "../../../firebase/userservice";

const EditCrew = () => {
const [firstname,setFirstname] = useState('');
const [lastname,setLastname] = useState('');
const [dob,setDob] = useState('');
const [userId,setUserId] = useState('');
const [gender,setGender] = useState('');
const [addtionreq,setAddtionreq] = useState('');
const [mobilNo,setMobilNo] = useState('');
const [email,setEmail] = useState('');
const [addline1,setAddline1] = useState('');
const [addline2,setAddline2] = useState('');
const [city,setCity] = useState('');
const [state,setState] = useState('');
const [pincode,setPincode] = useState('');

  const userrep = useRef('');
  const [usererrors,setuserErrors] = useState(false);
  const navigate =useNavigate();

const usernameChange =async (e)=>{
  
  setUserId(e.target.value)
  const userref = userrep.current.value
  const data =await  UserDataService.getCrewMember();
   data.docs.forEach((doc) => {
  const newdata = doc.data();
  if (newdata.userId === userref){
     setuserErrors(true)
     setTimeout(()=>{
      setuserErrors( false);
        },3000)
        }
   })
}
let value = Default.Form;
let {FirstName,LastName,Dop,UserId,Gender,Email,
  Addline1,Addline2,City,State,Pincode,Addtionreq,MobilNo,Address}= value ;
  
  const submitHandler = async(e) =>{
  e.preventDefault();
  const crew = {
    firstname,lastname,dob,userId,gender,addtionreq,mobilNo,email,addline1,addline2,city,state,pincode,
    };
    const assignCrew = {
      firstname,userId,gender,addtionreq,mobilNo,email,location:city,
      days:[{date:'',assignflight:''}]
      };
      const addCrew ={
        username:firstname,
        userId:userId,
        status:'Active',
        role:'Crew Member',
        password: '232323'
      }

  try {
      await UserDataService.addCrewMember(crew)
      await UserDataService.addAssignCrew(assignCrew)
      await UserDataService.addUsers(addCrew);  
       
  }catch(err){
      console.log(err)
  }
  setFirstname('')
  setLastname('')
  setDob('')
  setUserId('')
  setGender('')
  setAddtionreq('')
  setMobilNo('')
  setEmail('')
  setAddline1('')
  setAddline2('')
  setCity('')
  setState('')
  setPincode('')
  navigate('/admin/crew/viewCrew')
}

const cancelChange =()=>{
  navigate('/admin/crew/viewCrew')
}
return (
  <>
    <div className="editpage_edit">
    <div className="addcrewTitle"><h5>Add New Crew Member</h5></div>
      <div className="editCrewHome">
        <form onSubmit={submitHandler}>
          <div className="editCrew">
            <div className="editUser_input">
              <label htmlFor="firstname">{FirstName.label}</label>
              <Input
                type={FirstName.type}
                name={FirstName.name}
                value={firstname}
                onChange={(e)=>setFirstname(e.target.value)}
              />
            </div>
            <div className="editUser_input">
              <label htmlFor="lastname">{LastName.label}</label>
              <Input
                type={LastName.type}
                name={LastName.name}
                value={lastname}
                onChange={(e)=>setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="editCrew">
            <div className="editUser_input">
              <label htmlFor="dob">{Dop.label}</label>
              <Input
                type={Dop.label}
                name={Dop.label}
                value={dob}
                onChange={(e)=>setDob(e.target.value)}
              />
            </div>
            <div className="editUser_input">
              <label htmlFor="userid">{UserId.label}  &nbsp;&nbsp;&nbsp;&nbsp;   <small>{usererrors ? "User Id already exist" : ""}</small></label>
              <input
                type={UserId.type}
                ref={userrep}
                value={userId}
                onChange={usernameChange}
                
              />
            </div>
          </div>
          <div className="editCrew">
            <div className="editUser_input">
              <label htmlFor="gender">{Gender.label}</label>
              {/* <Input
                type={Gender.type}
                name={Gender.name}
                value={gender}
                onChange={(e)=>setGender(e.target.value)}
              /> */}
               <select value={gender}
                  id="role"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Select gender">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
          
                </select>
            </div>
            <div className="editUser_input">
              <label htmlFor="addtionreq">{Addtionreq.label}</label>
              <Input
                type={Addtionreq.type}
                name={Addtionreq.type}
                value={addtionreq}
                onChange={(e)=>setAddtionreq(e.target.value)}
              />
            </div>
          </div>
          <div className="editCrewMob">
            <div className="editMob">
              <div>
                <label htmlFor="mobileNo">{MobilNo.label}</label>
                <Input
                  type={MobilNo.type}
                  name={MobilNo.name}
                  value={mobilNo}
                  onChange={(e)=>setMobilNo(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">{Email.label}</label>
                <Input
                  type={Email.type}
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="editCrewAddress">
              <div>
                <label htmlFor="address">{Address.label}</label>
                <Input
                  type={Addline1.type}
                  className="editAdd"
                  placeholder={Addline1.label}
                  name={Addline1.name}
                  value={addline1}
                  onChange={(e)=>setAddline1(e.target.value)}
                />
                <Input
                  type={Addline2.type}
                  className="editAdd"
                  placeholder={Addline2.label}
                  name={Addline2.name}
                  value={addline2}
                  onChange={(e)=>setAddline2(e.target.value)}
                />
                <div className="editCrewAdd">
                  <Input
                    type={City.type}
                    placeholder={City.label}
                    name={City.name}
                    value={city}
                    onChange={(e)=>setCity(e.target.value)}
                  />
                  <Input
                    type={State.type}
                    placeholder={State.label}
                    name={State.name}
                    value={state}
                    onChange={(e)=>setState(e.target.value)}
                  />
                  <Input
                    type={Pincode.type}
                    placeholder={Pincode.label}
                    name={Pincode.name}
                    value={pincode}
                    onChange={(e)=>setPincode(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="editUser_button">
            <div>
              <button type="reset" className="btn btn-primary"onClick={cancelChange}>
                Cancel
              </button>
            </div>
            <div>
              <button type="submit" className="btn btn-primary">
             Add User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
);
}

export default EditCrew