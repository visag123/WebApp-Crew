import React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from "react-router";
import UserDataService from "../../../firebase/userservice";
import Input from '../../../components/Input/Input';
import Default from "../../Default.json";

const AddTransProvider = () => {
    const [agencyName,setAgencyName] = useState('');
    const [location,setLocation] = useState('');
    const [contactNo,setContactNo] = useState('');
    const [noOfVehicles,setNoOfVehicles] = useState('');
    const [noOfDrivers,setNoOfDrivers] = useState('');
    const [activeFrom,setActiveFrom] = useState('');
    const [activeTo,setActiveTo] = useState('');
    const [email,setEmail] = useState('');
    const navigate = useNavigate();

    let value = Default.Form;
    let {ActivePeriod,NoofDrivers,ContactNo,NoOfVehicles,Location,AgencyName,Email}=value
  
      const submitHandler = async(e) =>{
        e.preventDefault();
        const newProvider = {
            agencyName,
            location,
            contactNo,
            noOfVehicles,
            noOfDrivers,
            activeFrom,
            activeTo,
            email
          };
          const newuser ={
            location,
            username:agencyName,
            status:'Active',
            role:'Transport Provider',
            password:'232323',
            email
          }

        try {           
            await UserDataService.addTransProvider(newProvider);
            await UserDataService.addUsers(newuser);
            navigate('/admin/trans/transprovider')
            console.log(newProvider);
          
        }catch(err){
            console.log(err)
        }
      }
      const clearUser =()=>{
        // setUsersid("")
        navigate('/admin/trans/transprovider')
      }
  return (
    <>
    <div className="editpage_maincontent">
    <div className="addcrewTitle"><h5>Add New Transport Provider</h5></div>
      <div className="editpage_edit">
        <div className="edit">
          <form onSubmit={submitHandler}>
            <div className="editUser">
              <div className="editUser_input"> 
                <label htmlFor="agencyName">{AgencyName.label}</label>
                <Input
                  type={AgencyName.type}
                  id="agencyName"
                  value={agencyName}
                  onChange={(e) => {
                    setAgencyName(e.target.value);
                  }}
            
                />
              </div>
              <div className="editUser_input">
                <label htmlFor="contactNo">{ContactNo.label}</label>
                <Input
                  type={ContactNo.type}
                  id="contactNo"
                  value={contactNo}
                  onChange={(e) => {
                    setContactNo(e.target.value);
                  }}
                
                />
              </div>
            </div>
            <div className="editUser"> 
              <div className="editUser_input">
                <label htmlFor="location">{Location.label}</label>
                <select value={location}
                  id="role"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Select Role">Select location</option>
                  <option value="Bengaluru">Bengaluru</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Goa">Goa</option>
                </select>
              </div>
              <div className="editUser_input">
              <label htmlFor="noOfVehicles">{NoOfVehicles.label}</label>
              <Input
                  type={NoOfVehicles.type}
                  id="noOfVehicles"
                  value={noOfVehicles}
                  onChange={(e) => {
                    setNoOfVehicles(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="editUser_status">
            <div className="editUser_in"> 
                <label htmlFor="noOfDrivers">{NoofDrivers.label}</label>
                <Input
                  type={NoofDrivers.type}
                  id="noOfDrivers"
                  value={noOfDrivers}
                  onChange={(e) => {
                    setNoOfDrivers(e.target.value);
                  }}
                />
              </div>
              
              <div className="editUser_input">
              <label htmlFor="">{ActivePeriod.label}</label>
               <div className='lifeSpan'>
                <Input
                  type={ActivePeriod.type}
                  className="lifeSpan_time"
                  value={activeFrom}
                  onChange={(e) => {
                    setActiveFrom(e.target.value);
                  }}
                />
                <font>to</font>
                <Input
                  type={ActivePeriod.type}
                  value={activeTo}
                  className="lifeSpan_time"
                  onChange={(e) => {
                    setActiveTo(e.target.value);
                  }}
                />
                </div>
              </div>
              
            </div>
            <div className="editUser">
              <div className="editUser_input"> 
                <label htmlFor="agencyName">{Email.label}</label>
                <Input
                  type={Email.type}
                  id="agencyName"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="editUser_button">
              <div>
                <button
                  type="reset"
                  className="btn btn-primary"
                  onClick={() => clearUser()}
                >
                  Cancel
                </button>
              </div>
              <div >
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
</>
  )
}

export default AddTransProvider