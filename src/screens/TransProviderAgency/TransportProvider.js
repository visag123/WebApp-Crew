import React,{useState,useEffect} from 'react';
import { Link, useNavigate, } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthcontext";
// import UserDataService from "../firebase/userservice"
import { Outlet } from "react-router-dom";

const TransportProvider = () => {

    const { userInfo } = useUserAuth();
    const navigate = useNavigate();  
    const logoutHandler =() =>{
        navigate('/')
      }
  return (
    <>
    <div className="nav">
      <h2 className="logo">
        <i className="fa-solid fa-plane-departure"></i>
        &nbsp;&nbsp; CREW <font>Logistics</font>
      </h2>
      <ul className="navlink">
        <li>
          <i className="fa-solid fa-bell" />
        </li>
        <li>
          <i className="fa-solid fa-gear" />
        </li>
        <li className='userProfile'>
          <i className="fa-solid fa-circle-user" />
          <small>
            {userInfo.nameId} <br />
            <span>Transport Provider</span>
          </small>
        </li>
      </ul>
    </div>
    <div className="content">
          <div className="sidecontent">
          <div className="sidebar">
          <ul>
            <Link to='/transportprovider/ManageDrivers'>
            <li>Manage Drivers</li>
            </Link>
            <Link to=''>
            <li>Manage Cabs</li>
            </Link>
            <Link to=''>
            <li>Logistic Arrangements</li>
            </Link>

              <li onClick={logoutHandler}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </li>
          </ul>
        </div>
          </div>
          <div className="maincontent">
            <Outlet />
          </div>
        </div>
    <div>

    </div>
    </>
    )
}

export default TransportProvider