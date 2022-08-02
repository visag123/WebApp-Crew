import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./ManageCrew.css"
import Default from "../../Default.json";
import UserDataService from "../../../firebase/userservice";
import { useUserAuth } from "../../../Context/UserAuthcontext";

const ManageCrew = () => {
    const [travel,setTravel] =useState([])
    const { getUserId } = useUserAuth();
    const date = new Date().toISOString().slice(0,10);
    const navigate = useNavigate();

  useEffect(()=>{
    getTravel()
  },[])
  
    const getTravel = async () => {
      const data = await UserDataService.getFlightRost();
      setTravel(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    let value = Default.Table;
    let {FlightRoute,FlightDateTime,CrewMembers,FlightNo}=value;
  return (
    <>
     <div className="addcrewTitle"><h5>Assign Crew Member to Listed Flights</h5></div>
     <div className="sys-table">
        <table>
          <thead>
            <tr>
              <th>{FlightNo}</th>
              <th>{CrewMembers}</th>
              <th>{FlightRoute}</th>
              <th>{FlightDateTime}</th>
            </tr>
          </thead>
          <tbody>
            {travel.map((doc) => {
              return (
                <tr key={doc.id}>
                  <td onClick={() => getUserId(doc.id)}><Link to='/admin/crew/addCrew'>{doc.FlightNumber}</Link></td>
                  <td className='No_of_crew'>{doc.CrewMember}</td>
                  <td>{doc.Origin} - {doc.Destination}</td>
                  <td>{date} - {doc.Departure}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ManageCrew