import React,{useState,useEffect} from 'react';
import { Link, useNavigate, } from "react-router-dom";
import { useUserAuth } from "../../Context/UserAuthcontext";
import UserDataService from "../../firebase/userservice"
import { Outlet } from "react-router-dom";


const CrewMember = () => {
    const [crewMember, setCrewMember] = useState([]);
    const { userInfo } = useUserAuth();
    const navigate = useNavigate();  

    const logoutHandler =() =>{
        navigate('/')
      }
      useEffect(() => {
        getCrewMember();
      }, []);
    
  
      const getCrewMember = async () => {
        const data = await UserDataService.getAssignCrews();
        setCrewMember(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };

      {crewMember && crewMember.filter((doc)=>{
        if(userInfo.userId === doc.userId && userInfo.nameId === doc.firstname ){
            return doc;
        }
    })
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
            <span>Crew Member</span>
          </small>
        </li>
      </ul>
    </div>
    <div className="content">
          <div className="sidecontent">
          <div className="sidebar">
          <ul>
            <Link to='/crewmember'>
            <li><i className="fa-solid fa-house-user"></i>Home</li>
            </Link>
            <Link to='/crewmember/memberRoster'>
            <li><i className="fa-solid fa-calendar-days"></i>View Roster</li>
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

export default CrewMember