import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Default from "../../Default.json";
import "./AddDriver.css"
import Input from '../../../components/Input/Input';
import UserDataService from "../../../firebase/userservice";
import { useUserAuth } from '../../../Context/UserAuthcontext';
import { connectFirestoreEmulator } from 'firebase/firestore';
import Button from '../../../components/Button/Button';


const AddDrivers = () => {
    const [cabDrivers, setcabDrivers] = useState({

        firstname: '',
        lastname: '',
        dob: '',
        userId: '',
        gender: '',
        PrimaryNumber: "",
        secondaryNumber: "",
        status: '',
        serviceArea: "",
        Shifttimings: "",
        emailadress: "",
        addline1: "",
        addline2: "",
        city: "",
        state: "",
        pincode: "",
        assignedCab:"N/A"

    })
    const [cabs, updateCabs] = useState([]);
    const navigate = useNavigate();
    const { usersId, setUsersid,userInfo } = useUserAuth();
    const [genderStatus, upadateGenderStatus] = useState();

    let value = Default.Form;
    let {FirstName,LastName,Dop,UserId,Gender,Status,Primarynumber,SecondaryNumber,ServiceArea,shifttimings,Email,
      Addline1,Addline2,City,State,Pincode,Address}=value

    const { firstname, lastname,
        dob, userId, gender, status, Shifttimings, PrimaryNumber, emailadress,serviceArea,
        secondaryNumber, addline1, addline2, city, state, pincode, assignedCab, cab } = cabDrivers
      

    const handlechange = (e) => {
        let { name, value } = e.target;
        setcabDrivers({ ...cabDrivers, [name]: value })
    }
    const editHandler = async () => {
        try {
            const docSnap = await UserDataService.getDriver(usersId);
            setcabDrivers(docSnap.data());
        } catch (err) {
            console.log(err);
        }
    };
    const getcabdetails = async () => {
        const data = await UserDataService.getcabdetails();
        updateCabs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    useEffect(() => {
        if (usersId !== undefined && usersId !== "") {
            editHandler();
        }
    }, [usersId]
    )
    useEffect(() => {
        getcabdetails();
    }, [])

    // /// ADD/ Drivers Fn ////
    const submitHandler = async (e) => {
        e.preventDefault();
        cabDrivers.serviceArea = userInfo.location;
         const addDriver = { firstname, lastname,
          dob, userId, gender, status, Shifttimings, PrimaryNumber, emailadress,
          serviceArea, secondaryNumber, addline1, addline2, city, state, pincode, assignedCab :"N/A"}
        try {
            if (usersId !== undefined && usersId !== "") {
                await UserDataService.updateDriver(usersId, addDriver);
                setUsersid("");
            navigate("/transportprovider/ManageDrivers");
            }
            else {
                await UserDataService.addDriver(cabDrivers);
                navigate('/transportprovider/ManageDrivers')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const closeChange = () => {
        setUsersid("")
        navigate('/transportprovider/ManageDrivers')

    }
    return (
      <>
        <div className="addcrewTitle"><h5>Add New Driver</h5></div>
        <div className="containeritem">
          <form onSubmit={submitHandler} className="add-driver-form">
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type={FirstName.type}
                  name={FirstName.name}
                  label={FirstName.label}
                  className="form-main"
                  value={firstname}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                    type={LastName.type}
                    name={LastName.name}
                    label={LastName.label}
                  className="form-main"
                  value={lastname}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type={Dop.type}
                  name={Dop.name}
                  label={Dop.label}
                  className="form-main"
                  value={dob}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type={UserId.type}
                  name={UserId.name}
                  label={UserId.label}
                  className="form-main"
                  value={userId}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <div>
               <label htmlFor="gender" >{Gender.label}</label>
                <select value={gender} id="gender" name={Gender.name} onChange={handlechange} className="form-main">
                  <option value="Select Gender" name={Gender.name}>Select Gender</option>
                  <option value="Male" name={Gender.name}>Male</option>
                  <option value="Female" name={Gender.name}>Female</option>
                </select>
               </div>
              </div>
              
              <div className="colitem">
                <Input
                  type={Status.type}
                  name={Status.name}
                  label={Status.label}
                  className="form-main"
                  value={status}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type={Primarynumber.type}
                  name={Primarynumber.name}
                  label={Primarynumber.label}
                  className="form-main"
                  value={PrimaryNumber}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  
                  type={ServiceArea.type}
                  // name={ServiceArea.name}
                  label={ServiceArea.label}
                  className="form-main"
                  disable="true"
                  value={userInfo.location}
        
                />
              </div>
            </div>
            <div className="rowitem">
              <div className="colitem">
                <Input
                  type={SecondaryNumber.type}
                 name={SecondaryNumber.name}
                 label={SecondaryNumber.label}
                  className="form-main"
                  value={secondaryNumber}
                  onChange={handlechange}
                />
              </div>
              <div className="colitem">
                <Input
                  type={shifttimings.type}
                  name={shifttimings.name}
                  label={shifttimings.label}
                  className="form-main"
                  value={Shifttimings}
                  onChange={handlechange}
                />
              </div>
            </div>
            <div className="rowitem ">
              <div className="colitem">
                <Input
                 type={Email.type}
                  name={Email.name}
                  label={Email.label}
                  value={emailadress}
                  onChange={handlechange}
                  className="form-main"
                />
              </div>
              <div className="colitem edittransAddress">
                <label htmlFor="address">{Address.label}</label>
                <Input
                  type={Addline1.type}
                  name={Addline1.name}
                  className="form-main"
                  placeholder={Addline1.label}
                  value={addline1}
                  onChange={handlechange}
                />
                <Input
                  type={Addline2.type}
                  className="form-main"
                  placeholder={Addline2.label}
                  name={Addline2.name}
                  value={addline2}
                  onChange={handlechange}
                />
                <div className="adress-content  ">
                  <div>
                  <Input
                    type={City.type}
                    name={City.name}
                    placeholder={City.label}
                    value={city}
                    className="form-control"
                    onChange={handlechange}
                  />
                  </div>
                  <Input
                    type={State.type}
                    placeholder={State.label}
                    name={State.name}
                    value={state}
                    className="form-control"
                    onChange={handlechange}
                  />
                  
                  <Input
                    type={Pincode.type}
                    name={Pincode.name}
                    placeholder={Pincode.label}
                    value={pincode}
                    className="form-control "
                    onChange={handlechange}
                  />
                </div>
              </div>
            </div>
            <div className="btn-actions btn-group mt-4 rowitem ">
              <Button
                type="submit"
                children="save"
                className="btn btn-primary"
                wrapperClass="me-2"
              />
              <br />
              <Button
                type="submit"
                children="save&add another"
                className="btn btn-success"
                wrapperClass="me-2"
              />
              <br />
              <Button
                wrapperClass="me-2"
                children="close"
                className="btn btn-danger"
                onClick={closeChange}
              />
            </div>
          </form>
        </div>
      </>
    );
}

export default AddDrivers