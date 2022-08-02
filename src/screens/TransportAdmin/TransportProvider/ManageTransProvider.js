import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import UserDataService from "../../../firebase/userservice";
import Default from "../../Default.json";

const ManageTransProvider = () => {
   const [transProvider,setTransProvider] =useState([]);

   let value = Default.Table;
   let {AgencyName,Location,NoofDrivers,NoofVehicles,ContactNO}=value

  useEffect(() => {
    getTransProvider();
  }, []);

  const getTransProvider = async () => {
    const data = await UserDataService.getTransProvider();
    setTransProvider(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <>
     <div className="editpage_search">
       <div className="editpage_Title"><h5>Transport Providers List</h5></div>
        <div className='editpage_Addprovider'><Link to="/admin/trans/addprovider">
          <i className="fa-solid fa-circle-plus" ></i>
          </Link></div>
      </div>
      <div className="sys-table">
    
        <table>
          <thead>
            <tr>
              <th>{AgencyName}</th>
              <th>{Location}</th>
              <th >{ContactNO}</th>
              <th>{NoofVehicles}</th>             
              <th>{NoofDrivers}</th>
            </tr>
          </thead>
          <tbody>
            {transProvider.map((doc) => {
              return (
                <tr key={doc.id}>
                  <td >{doc.agencyName}</td>
                  <td>{doc.location}</td>
                  <td> {doc.contactNo}</td>
                  <td>{doc.noOfVehicles}</td>
                  <td className="viewRost">{doc.noOfDrivers}</td>
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ManageTransProvider