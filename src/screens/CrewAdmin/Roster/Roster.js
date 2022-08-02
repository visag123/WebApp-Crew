import React, { useState, useEffect,useRef } from "react";
import UserDataService from "../../../firebase/userservice";
import Default from "../../Default.json";
import { Link } from 'react-router-dom';
import { useUserAuth } from "../../../Context/UserAuthcontext";
// import * as XLSX from 'xlsx'
import "./Roster.css";

const Roster = () => {
  const [roster, setRoster] = useState([]);
  const [flightRoster, setFlightRoster] = useState([]);
  const [error,setError] = useState(false);
  const date = new Date().toISOString().slice(0,10)
  const [today,setDate] =useState(date);
  const [searchUsers, setSearchUsers] = useState("");
  const [departure,setDeparture] =useState('')
  const [arrival,setArrival] =useState('')
  const [from,setFrom] =useState('')
  const [to,setTo] =useState('')
  const searchinput = useRef();
  const { getUserId } = useUserAuth();
 // const [fetchFlight,setFetchFlight] = useState([])
   
  useEffect(() => {
    getRoster();
  }, []);
  useEffect(() => {
    getFlightRoster();
  }, []);

  const searchHandler = (e) => {
    const searchrf = searchinput.current.value;
    setSearchUsers(searchrf);
  };
  
  const onDateChange =(e)=>{
    setDate(e.target.value)
  }

  const getRoster = async () => {
    const data = await UserDataService.getFlightRoster();
    setRoster(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const getFlightRoster = async () => {
    const data = await UserDataService.getFlightRost();
    setFlightRoster(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const routeHandler = (e) => {
    e.preventDefault();
    setError(true)
    setFrom(departure)
    setTo(arrival)
    setDeparture('')
    setArrival('')
  }

  const resetSearch = () => {
    setError(false)
    setDate(date)
  }

//   const chooseFile =async (e) =>{
//     const file = e.target.files[0];
//     const data = await file.arrayBuffer();
//     const workbook = XLSX.read(data);
//     const workSheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsonData = XLSX.utils.sheet_to_json(workSheet);
//     setFetchFlight(jsonData)
//       console.log(jsonData);
//   }
//   console.log(fetchFlight);

//   useEffect(() => {
//    fetchFlightData();
//  }, [fetchFlight]);
 
//  const fetchFlightData = () =>{
//    fetchFlight.forEach(async (item) => {
//      const flightData = {
//        Origin: item.Origin,
//        Destination: item.Destination,
//        FlightNumber: item.FlightNumber,
//        Arrival: item.Arrival,
//        Departure: item.Departure,
//        CrewMember:item.CrewMembers
//      };
//      try {

//       await UserDataService.addFlightRost(flightData);

//      } catch (err) {
//        console.log(err);
//      }
//    });
//  }
let value = Default.DefaultCrewData
let [FlightNo,Origin,Destination,CrewMembers]=value

const TableTitle=(data)=>{
  return data.map((doc)=>{
    return(
      <th>{doc.title}</th>
    )
  })
}
  return (
    <>   
    <div className="addcrewTitle"><h5>Flight Schedule</h5></div>
      <div className="sys-table">
        <div className="rosterHeader">
          <div className="rosterSearch">
            <div className="rosterSearchFilter">
            <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <input
              type="text"
              placeholder="Search"             
              ref={searchinput}
              value={searchUsers}
              onChange={searchHandler}
            />
            </div>
            
          </div>
          <div className="rosterFilter">
            <div className="filterDate">
              <li>Select Date</li>
              <input type="date" value={today} onChange={onDateChange} />
            </div>
           <div className="filterFlight">
              <form onSubmit={routeHandler}>
                <li>Flight Route</li>
                <input
                  type="text"
                  placeholder={Origin.Origin}
                  value={departure}
                  required
                  onChange={(e) => setDeparture(e.target.value)}
                />
                <input
                  type="text"
                  placeholder={Destination.Destination}
                  value={arrival}
                  required
                  onChange={(e) => setArrival(e.target.value)}
                />
                <button type="submit">GO</button>
                <button type="reset" onClick={resetSearch}><i className="fa-solid fa-delete-left"></i></button>
                {/* <input type="file" onChange={(e) => chooseFile(e) } /> */}
              </form>
            </div>
          </div>
        </div>
        <table className="rosterTable">
          <thead>
            <tr>
              {TableTitle (value)}
            </tr>
          </thead>
          <tbody>
            {flightRoster
              .filter((doc) => {
                if (searchUsers === '' && error === false){
                  return doc
               }
                else if (
                  error === false &&
                  doc.FlightNumber.toLowerCase().includes(searchUsers.toLowerCase())
                ) {
                  return doc;
                } 
                else if (from === doc.Origin.toLowerCase() && to === doc.Destination.toLowerCase()){
                  return doc;
                }                 
              })
              .map((doc) => {
                return (
                  <tr key={doc.id}>
                    <td className="flightNo">{doc.FlightNumber}</td>
                    <td>{doc.Origin}</td>
                    <td>{doc.Destination}</td>
                    {/* <td className="Num_crew">{doc.CrewMember}</td> */}
                    <td>{today}</td>
                    <td className="Num_crew">{doc.Departure}</td>
                    <td>{doc.Arrival}</td>
                    <td className="Num_crew">{doc.CrewMember}</td>
                    <td className="crewAssign">
                    <button onClick={() => getUserId(doc.id)}><Link to='/admin/crew/addCrew'><i className="fa-solid fa-pen-to-square"></i></Link></button></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Roster;
