import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import UserDataService from "../../../firebase/userservice";
import Input from "../../../components/Input/Input";
import { useUserAuth } from "../../../Context/UserAuthcontext";
import Button from "../../../components/Button/Button";
import Default from "../../Default.json";

const AddCrew = () => {
  const [assignMember, setAssignMember] = useState([]);
  // const [assignCrewMember, setAssignCrewMember] = useState([]);
  const [getFlightDetail,setGetFlightDetail] = useState('');
  const [getFlightNo,setGetFlightNo] = useState('');
  const [getFlightOrigin,setGetFlightOrigin] = useState('');
  const [getNoOfCrew,setgetNoOfCrew] = useState(0);
  const [getMaxCrew,setgetMaxCrew] = useState(0);
  const [getCrewMemId,setGetCrewMemId] = useState([]);
  const [crewMember,setCrewMember] = useState([])
  const [checkbox,setCheckbox] = useState(false);
  const { usersId,setUsersid } = useUserAuth();
  const date = new Date().toISOString().slice(0,10)
  const [todayDate,setTodayDate] = useState(date)
  const navigate = useNavigate();
  
  let value = Default.Table;
  let {Gender,EmployeeName,AdditionalRequests,UserID}=value;

  const editHandler = async () => {
    try {
    const docSnap = await UserDataService.getFlightID(usersId);
      // console.log("the record is :", docSnap.data());
      setGetFlightDetail(docSnap.data());
      setGetFlightNo(docSnap.data().FlightNumber);
      setGetFlightOrigin(docSnap.data().Origin);
      setgetNoOfCrew(docSnap.data().NoOfCrew +1)
      setgetMaxCrew(docSnap.data().CrewMember)

    } catch (err) {
        console.log(err);
    }
  };

// console.log(getFlightDetail);

  useEffect(() => {
    if (usersId !== undefined && usersId !== "") {
      editHandler();
    }
  }, [usersId]);

  useEffect(() => {

    getCrewMember();
  }, []);

  const getCrewMember = async () => {
    const data = await UserDataService.getAssignCrews();
    setAssignMember(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const clearUser =()=>{
    setUsersid("")
    navigate('/admin/crew/roster')
  }

  const getCrewMemberId =(id)=>{
    setGetCrewMemId(id)
    console.log(id);
    // console.log(checkbox);
  }

  const crewHandler = async () => {
    try {
    const docSnap = await UserDataService.getAssignCrewID(getCrewMemId);
      console.log("the record is :", docSnap.data());
      setCrewMember(docSnap.data());
    
    } catch (err) {
        console.log(err);
    }
  };
  useEffect(() => {
    if (getCrewMemId !== undefined && getCrewMemId !== "") {
      crewHandler();
    }
  }, [getCrewMemId]);
 
  let newArray =[]
 
    assignMember.filter((doc)=>{
     
      let i = 0;
      for( i ;i<doc.days.length; i++ ){

        if (doc.days[i].date === todayDate){
          return doc;
        }
      } 
        return newArray.push(doc);      
    })

const updateFlightNo = async () =>{

  setgetNoOfCrew(getNoOfCrew+1)
         const addcrew ={
          NoOfCrew:getNoOfCrew
         }

         const addflight= {
           assignflight:getFlightNo,
           date:todayDate
          }
   
      { checkbox && crewMember.days.push(addflight);
       console.log(crewMember); 
      }    
        
      const assignCrew=
        {assignflightNo:getFlightNo,
          date:todayDate,
          crewMemberId:crewMember.userId,
          crewMemberName:crewMember.firstname,
          Origin:getFlightDetail.Origin,
          Destination:getFlightDetail.Destination,
          Departure:getFlightDetail.Departure,
          Arrival:getFlightDetail.Arrival,
          ContactNo:crewMember.mobilNo
        }        
  try {
    if (getNoOfCrew < getFlightDetail.CrewMember+1 && checkbox === true) {
   
      await UserDataService.addAssignFlight(assignCrew);
      setCrewMember((crewMember.location = getFlightDetail.Destination));
      await UserDataService.updateAssignCrew(getCrewMemId, crewMember);
      getCrewMember();
      await UserDataService.updateFlightRoster(usersId, addcrew);
    }
  
  } catch (err) {
    console.log(err);
  }

}
  return (
    <>
      <div className="sys-table">
        <div className="addCrewHeader">
          <div className="SearshFlightNo">
            <Input type="text" label="Flight No" value={getFlightNo} onChange={(e) => setGetFlightNo(e.target.value)}/>
          </div>
          <div className="SearshFlightNo">
            <Input
              type="date"
              label="Date"
              value={todayDate}
              onChange={(e) => setTodayDate(e.target.value)}
            />
          </div>
          <div>
            <Button onClick={updateFlightNo}>Save</Button>
          </div>
          <div>
            <Button onClick={clearUser}>Cancel</Button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>{UserID}</th>
              <th>{EmployeeName}</th>
              <th>{Gender}</th>
              <th className="addReq">{AdditionalRequests}</th>
            </tr>
          </thead>
          <tbody>
            {newArray.filter((doc) => {
                   if (doc.location === getFlightOrigin ){
                      return  doc;
                   }                 
              })
            .map((doc) => {
              return (
                <tr key={doc.id}>
                  <td onClick={() => getCrewMemberId(doc.id)}><input type="checkbox" onChange={(e)=> setCheckbox(e.target.checked)}/></td>
                  <td>{doc.userId}</td>
                  <td className='No_of_crew'>{doc.firstname}</td>
                  <td>{doc.gender}</td>
                  <td >{doc.addtionreq}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
    
        
       
      </div>
    </>
  );
}


export default AddCrew
