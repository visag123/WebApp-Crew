import { Link, useNavigate } from "react-router-dom";
import UserDataService from "../../../firebase/userservice";
import React, { useState, useEffect } from 'react';


function Viewcabs() {
const [cabdetails, upadatecabdetails] = useState([]);
const navigate = useNavigate()
 
   const getcabdetails = async () => {
    const data = await UserDataService.getcabdetails();
    if(data){
      upadatecabdetails(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };
   useEffect(()=>{
    getcabdetails();
   },[])
  
  return (
        <>
      <div className="editpage_search">
        <form>
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <input type="text" placeholder="search" />
        </form>
      </div>
      <div className="sys-table">
        <table>
          <thead>
            <tr>
              <th>Registration Number</th>
              <th>Category</th>
              <th>No of seats </th>
              <th>Location</th>
              <th>Assigned Driver</th>
            </tr>
          </thead>
          <tbody>
          {cabdetails.map((doc) => {
              return (
                <tr key={doc.id}>

                  <td>{doc.RegistrationNumber}</td>
                  <td>{doc.Category}</td>
                  <td>{doc.NoOfSeats}</td>
                  <td>{doc.Location}</td>
                  <td>{doc.AssignedDriver}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Viewcabs