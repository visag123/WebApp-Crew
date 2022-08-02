import React, { useState,useEffect } from 'react';
import {BsCircle} from 'react-icons/bs';
import {GiCommercialAirplane} from 'react-icons/gi';
import { useUserAuth } from "../../Context/UserAuthcontext";
import UserDataService from "../../firebase/userservice";

const CrewMemberRoster = () => {

    const [todo,setTodo] = useState([]);
    const [flightData,setFlightData] = useState([]);
    // const { usersId,setUsersid } = useUserAuth();
    const date = new Date().toISOString().slice(0,10)
    const [today,setDate] =useState(date);
    const [flag,setflag] =useState(false);
    const { userInfo } = useUserAuth();

          useEffect(() => {
            getFlightroster();
          }, []);
        
          const getFlightroster = async () => {
            const data = await UserDataService. getAssignFlight();
            setFlightData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };    
          const onDateChange =(e)=>{
            setDate(e.target.value)
            setflag(true)
          }
          const resetSearch = () => {
            setflag(false)
            setDate(date)
          }
  return (
    <>
    <div className="CrewfilterDate">
     <label>Select Date</label>
      <input type="date" value={today} onChange={onDateChange} />
      <button type="reset" onClick={resetSearch}><i className="fa-solid fa-delete-left"></i></button>
    </div>
    
{  flightData.filter((doc) => {

  if (userInfo.userId === doc.crewMemberId && flag === false ) {
          return doc;
        } 
        else if(userInfo.userId === doc.crewMemberId && today === doc.date ){
          return doc;
        }             
      })
    .map((doc)=>{
      function parseTime(s) {
        var c = s.split(':');
        return parseInt(c[0]) * 60 + parseInt(c[1]);  
     }
      return (
        <div className='crewRoster_wrapper' key={doc.id}>
        <div className='crewRost_head'>
            <div><i className="fa-solid fa-calendar-days"></i>&nbsp; <b> {doc.date} </b></div>
            <div> <p><small>Pickup from Hotel</small> @ {}</p></div>
        </div>
        <div className='crewRost_content'>
           <div>
                <h5>{doc.Origin} <br />
                <small>{doc.Departure}</small></h5>          
           </div>
          <div className='crew_center'>
            <div className='crew_flight'>
            <small>{doc.assignflightNo}  </small>
            </div>
            <div className='crewRost_BS'>
           <BsCircle size=".7em" />
           <hr />
           <GiCommercialAirplane size="1.7em" color='blue'/>
           <hr />
           <BsCircle size=".7em" />
           </div>
           <div className='crew_flight'>
             <small>{parseTime(doc.Arrival) - parseTime(doc.Departure)} mins <br /> <font className='duration'>Duration</font>  </small>
           </div>
          </div>
           <div> 
               <h5>{doc.Destination} <br />
                <small>{doc.Arrival}</small></h5>                     
               </div>
        </div>
        <div className='crewRost_fooder'>
          <p><small>Pickup from Airport</small> @ {}</p>
        </div>
     </div>
      )
    })} 
</>
  )
}

export default CrewMemberRoster