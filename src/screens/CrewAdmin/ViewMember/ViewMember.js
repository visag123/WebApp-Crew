import React, { useState, useEffect,useRef } from "react";
import UserDataService from "../../../firebase/userservice";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../../Context/UserAuthcontext";
import Default from "../../Default.json";

const ViewMember = () => {
  const [crewMember, setCrewMember] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");
  const searchinput = useRef();
  const navigate = useNavigate();
  const { getUserId } = useUserAuth();

  let value = Default.Table;
  let {UserID,EmployeeName,Gender,ContactNO,Email,ViewRoster}=value

  useEffect(() => {
    getCrewMember();
  }, []);

  const searchHandler = (e) => {
    const searchrf = searchinput.current.value;
    setSearchUsers(searchrf);
  };

  const getCrewMember = async () => {
    const data = await UserDataService.getAssignCrews();
    setCrewMember(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const addCrewMember = () => {
    navigate("/admin/crew/editCrew");
  };

  return (
    <>
      <div className="editpage_search">
        <div className="editpage_Title"><h5>Crew Members List</h5></div>
      <div className="editpage_search_filter">
      <form>
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
        </form>
        <i className="fa-solid fa-circle-plus" onClick={addCrewMember}></i>
      </div>
      </div>
      <div className="sys-table">
        <table>
          <thead>
            <tr>
              <th>{UserID}</th>
              <th>{EmployeeName}</th>
              <th>{Gender}</th>
              <th>{ContactNO}</th>
              <th>{Email}</th>
              <th>{ViewRoster}</th>
            </tr>
          </thead>
          <tbody>
            {crewMember
              .filter((doc) => {
                if (searchUsers === ''){
                  return doc
               }
                else if (doc.firstname.toLowerCase().includes(searchUsers.toLowerCase())) {
                  return doc;
                } 
                              
              })
            .map((doc) => {
              return (
                <tr key={doc.id}>
                  <td >{doc.userId}</td>
                  <td>{doc.firstname}</td>
                  <td>{doc.gender}</td>
                  <td>{doc.mobilNo}</td>
                  <td>{doc.email}</td>
                  <td className="viewRost" onClick={() => getUserId(doc.id)}>
                    <Link to="/admin/crew/crewRost"><button>View Roster</button></Link>
                  </td>
                 
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewMember;
