import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login/Login';
import Resetpassword from './screens/ResetPassword/Resetpassword';
import Signup from './screens/Signup/Signup';
import SysAdminpage from './screens/SystemAdmin/SysAdminpage';
import { UserAuthContextProvider } from './Context/UserAuthcontext';
import Editpage from './screens/SystemAdmin/EditPage/Editpage';
import Sidebar from './components/Sidebar/Sidebar';
import TransportAdmin from './screens/TransportAdmin/TransportAdmin';
import CrewAdmin from './screens/CrewAdmin/CrewAdmin';
import Userlist from './screens/SystemAdmin/Userlist/Userlist';
import Roster from './screens/CrewAdmin/Roster/Roster';
import ManageCrew from './screens/CrewAdmin/ManageCrew/ManageCrew';
import EditCrew from './screens/CrewAdmin/ManageCrewMember/EditCrew';
import ViewMember from './screens/CrewAdmin/ViewMember/ViewMember';
import AddCrew from "./screens/CrewAdmin/ManageCrew/AddCrew";
import AddDrivers from "./screens/TransProviderAgency/ManageDrivers/Add Drivers";
import Viewcabs from "./screens/TransportAdmin/View Cab Details/Viewcabs";
import { CrewRost } from "./screens/CrewAdmin/Roster/CrewRost";
import CrewLogistic from "./screens/CrewAdmin/CrewLogistic/CrewLogistic";
import CrewMember from "./screens/CrewMember/CrewMember";
import CrewMemberRoster from "./screens/CrewMember/CrewMemberRoster";
import ManageTransProvider from "./screens/TransportAdmin/TransportProvider/ManageTransProvider";
import AddTransProvider from "./screens/TransportAdmin/TransportProvider/AddTransProvider";
import TransportProvider from "./screens/TransProviderAgency/TransportProvider";
import ManageDrivers from "./screens/TransProviderAgency/ManageDrivers/ManageDrivers";
import ArrangeTransport from "./screens/CrewAdmin/CrewLogistic/ArrangeTransport";



function App() {
  return (
    <div className="App">
      <UserAuthContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/sidebar" element={<Sidebar />}/>
            <Route path="/reset" element={<Resetpassword />}/>
            <Route path="/signup" element={<Signup />}/>          
            <Route path="/crewmember" element={<CrewMember />}>
            <Route path="memberRoster" element={<CrewMemberRoster/>}/>       
            </Route>
            <Route path="/transportprovider" element={<TransportProvider />}> 
            <Route path="ManageDrivers" element={<ManageDrivers/>}/>
            <Route path="addDrivers" element={<AddDrivers />}/> 
            </Route>
            <Route path="/admin" element={<SysAdminpage/>}>           
            <Route path="edit" element={<Editpage/>}/>
            <Route path="users" element={<Userlist />}/>
            <Route path="trans" element={<TransportAdmin />}>          
            <Route path="viewcabs" element={<Viewcabs/>}/>
            <Route path="transprovider" element={<ManageTransProvider/>}/>
            <Route path="addprovider" element={<AddTransProvider/>}/>
            </Route>
            <Route path="crew" element={<CrewAdmin />}>
            <Route path="roster" element={<Roster/>}/>
            <Route path="manageCrew" element={<ManageCrew/>}/>
            <Route path="viewCrew" element={<ViewMember/>}/>
            <Route path="editCrew" element={<EditCrew/>}/>
            <Route path="addCrew" element={<AddCrew/>}/>
            <Route path="crewRost" element={<CrewRost/>}/>
            <Route path="crewLogis" element={<CrewLogistic/>}/>
            <Route path="arrangetrans" element={<ArrangeTransport/>}/>
            </Route>
            </Route>
          </Routes>
        </Router>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
