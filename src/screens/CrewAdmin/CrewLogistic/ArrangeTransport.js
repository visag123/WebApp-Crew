import React, { useState,useEffect } from 'react';
import Default from "../../Default.json";
import Input from '../../../components/Input/Input';
import UserDataService from "../../../firebase/userservice";
import { useUserAuth } from "../../../Context/UserAuthcontext";
import { Link, useNavigate } from "react-router-dom";


const ArrangeTransport = () => {
    const[destination,setDestination] = useState('');
    const[crewMemberName,setCrewMemberName] = useState('');
    const[pickUp,setPickup] = useState('');
    const[dropLocation,setdropLocation] = useState('');
    const { usersId,setUsersid } = useUserAuth();
    const navigate = useNavigate();

    let value = Default.Form;
    let {Arrivinglocation,CrewMemberName,Pickup,DropLocation}=value

    const editHandler = async () => {
        try {
        const docSnap = await UserDataService.getAssignFlightId(usersId);
          console.log("the record is :", docSnap.data());
          setDestination(docSnap.data().Destination);
          setCrewMemberName(docSnap.data().crewMemberName);
          setPickup(docSnap.data().Arrival);
      
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
            crewMemberName,
            destination,
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
    <div className="addcrewTitle"><h5>Make Transport Request</h5></div>
      <div className="editpage_edit">
        <div className="edit">
          <form onSubmit={submitHandler}>
            <div className="editUser">
              <div className="editUser_input"> 
                <label htmlFor="agencyName">{CrewMemberName.label}</label>
                <Input
                  type={CrewMemberName.type}
                  id="agencyName"
                  value={crewMemberName}
                  onChange={(e) => {
                    setCrewMemberName(e.target.value);
                  }}
            
                />
              </div>
              <div className="editUser_input">
                <label htmlFor="contactNo">{Arrivinglocation.label}</label>
                <Input
                  type={Arrivinglocation.type}
                  id="contactNo"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
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