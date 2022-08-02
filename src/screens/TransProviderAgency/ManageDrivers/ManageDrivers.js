import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./ManageDrivers.css"
import UserDataService from "../../../firebase/userservice";
import { useUserAuth } from '../../../Context/UserAuthcontext';
import Default from "../../Default.json";

const ManageDrivers = () => {

  const [drivers, setDrivers] = useState([])
  let value = Default.Table;
  let {DriverName,AssignedCab,ServiceArea,Status,ContactNO,UserID}=value
  

useEffect(() => {
  getTransProvider();
}, []);

  const { getUserId, userInfo } = useUserAuth();

  useEffect(() => {
    console.log(userInfo);

    getTransProvider();
  }, []);

  const getTransProvider = async () => {
    const data = await UserDataService.getDrivers();
    const locationsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter(item => item.serviceArea === userInfo.location)
    setDrivers(locationsData);
  };
  console.log(drivers);
  return (
    <>
      <div className="editpage_search">
        <div className="editpage_Title"><h5>Drivers List</h5></div>
        <div className='editpage_Addprovider'><Link to="/transportprovider/addDrivers" >
          <i className="fa-solid fa-circle-plus" ></i>
        </Link></div>
      </div>
      <div className="sys-table">
        <table>
          <thead>
            <tr>
            <th>{DriverName}</th>
              <th>{UserID}</th>
              <th>{Status}</th>
              <th>{ContactNO}</th>
              <th>{ServiceArea}</th>
              <th>{AssignedCab}</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((doc) => {
              return (
                <tr key={doc.id}>
                  <td onClick={() => getUserId(doc.id)}><Link to='/transportprovider/addDrivers'>{doc.firstname}</Link></td>
                  <td onClick={() => getUserId(doc.id)}><Link to='/transportprovider/addDrivers'>{doc.userId}</Link></td>
                  <td>{doc.status}</td>
                  <td>{doc.PrimaryNumber}</td>
                  <td>{doc.serviceArea}</td>
                  <td>{doc.assignedCab}</td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>

  )
}

export default ManageDrivers