import React, { useState,useEffect } from 'react';
import Default from "../../Default.json";
import Input from '../../../components/Input/Input';
import UserDataService from "../../../firebase/userservice";
import { useUserAuth } from "../../../Context/UserAuthcontext";
import { Link, useNavigate } from "react-router-dom";


const ArrangeTransport = () => {
    const[employeeId,setEmployeeId] = useState('');
    const[employeeName,setEmployeeName] = useState('');
    const[pickUp,setPickup] = useState('');
    const[dropLocation,setdropLocation] = useState('');
    const { usersId,setUsersid } = useUserAuth();
    const navigate = useNavigate();

    let value = Default.Form;
    let {EmployeeID,EmployeeName,Pickup,DropLocation}=value

    const editHandler = async () => {
        try {
        const docSnap = await UserDataService.getAssignFlightId(usersId);
          console.log("the record is :", docSnap.data());
          setEmployeeId(docSnap.data().crewMemberId);
          setEmployeeName(docSnap.data().crewMemberName);
          pickUp(docSnap.data().Arrival);
      
        } catch (err) {
            console.log(err);
        }
      };
      useEffect(() => {
        if (usersId !== undefined && usersId !== "") {
          editHandler();
        }
      }, [usersId]);

    const submitHandler = async(e) =>{
        e.preventDefault();
        const newProvider = {
            employeeId,
            employeeName,
            pickUp,
            dropLocation
          };
        try {           
            await UserDataService.addlogisticsArrange(newProvider);
            navigate('/admin/crew/crewLogis')
            console.log(newProvider);
          
        }
          catch(err){
            console.log(err)
        }
      }
      
      const clearUser =()=>{
        setUsersid("")
        navigate('/admin/crew/crewLogis')
      }
  return (
    <>
    <div className="editpage_maincontent">
    <div className="addcrewTitle"><h5>Arrange Transport</h5></div>
      <div className="editpage_edit">
        <div className="edit">
          <form onSubmit={submitHandler}>
            <div className="editUser">
              <div className="editUser_input"> 
                <label htmlFor="agencyName">{EmployeeID.label}</label>
                <Input
                  type={EmployeeID.type}
                  id="agencyName"
                  value={employeeId}
                  onChange={(e) => {
                    setEmployeeId(e.target.value);
                  }}
            
                />
              </div>
              <div className="editUser_input">
                <label htmlFor="contactNo">{EmployeeName.label}</label>
                <Input
                  type={EmployeeName.type}
                  id="contactNo"
                  value={employeeName}
                  onChange={(e) => {
                    setEmployeeName(e.target.value);
                  }}
                
              />
              </div>
            </div>
            <div className="editUser"> 
            <div className="editUser_input">
              <label htmlFor="noOfVehicles">{Pickup.label}</label>
              <Input
                  type={Pickup.type}
                  id="noOfVehicles"
                  value={pickUp}
                  onChange={(e) => {
                    setPickup(e.target.value);
                  }}
                />
              </div>
              <div className="editUser_input">
              <label htmlFor="noOfVehicles">{DropLocation.label}</label>
              <Input
                  type={DropLocation.type}
                  id="noOfVehicles"
                  value={dropLocation}
                  onChange={(e) => {
                    setdropLocation(e.target.value);
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

export default ArrangeTransport