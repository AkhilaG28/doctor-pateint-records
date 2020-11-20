import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { addPatientRecord } from "../PatientRecords/actions";

function AddPatient() {
  let initialState = {
    gender: "",
    name: "",
    age: "",
    avatar: "",
  };
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.Auth);
  const [patientDetails, setPatientDetails] = useState(initialState);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file")
      setPatientDetails({ ...patientDetails, avatar: e.target.files[0] });
    else setPatientDetails({ ...patientDetails, [name]: value });
  };

  const [medicines, setMedicines] = useState(0);
  const [prescription, setPrescription] = useState([]);

  const handleAdd = (obj) => {
    setPrescription([...prescription, obj]);
    alert("Medicine Added!");
  };

  const addMedicine = () => {
    console.log("redirects");
    let getMedicine = [];
    for (let i = 0; i < medicines; i++) {
      getMedicine.push(
        <div key={i}>
          <Prescription onSubmit={handleAdd} />
        </div>
      );
    }
    return getMedicine;
  };

  const addPatient = (e) => {
    e.preventDefault();
    let patientRecord = new FormData();
    for (let key in patientDetails) {
      patientRecord.append(key, patientDetails[key]);
    }
    patientRecord.append("prescription", prescription);
    patientRecord.append("docEmail", userData.email);
    dispatch(addPatientRecord(patientRecord));
    console.log("pres", prescription);
  };

  return (
    <div>
      <h2 className="text-center mt-5">Add a Patient Record</h2>
      <form encType="multipart/form-data" className="offset-3 col-6">
        <div className="my-4">
          <input
            onChange={handleChange}
            name="name"
            value={patientDetails.name}
            type="text"
            className="form-control"
            placeholder="Enter name of patient"
          />
        </div>
        <div className="row">
          <div className="col-6 mb-4">
            <input
              onChange={handleChange}
              name="age"
              value={patientDetails.age}
              type="number"
              className="form-control"
              placeholder="Enter age of patient"
            />
          </div>
          <div className="col-6 mt-2">
            <div className="form-check form-check-inline ml-4">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={handleChange}
                id="male"
                value="Male"
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={handleChange}
                id="female"
                value="Female"
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                onChange={handleChange}
                id="other"
                value="Other"
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
          </div>
        </div>
        <div className="form-group row text-left mt-4 ml-3">
          <label htmlFor="imageFile">Upload picture</label>
          <input
            type="file"
            onChange={handleChange}
            className="form-control-file"
            id="imageFile"
          />
        </div>
        {/* <div className="row text-center">
          <div className="col">
            <input
              onChange={handleMedicine}
              type="text"
              placeholder="Medicine"
            />
          </div>
          <div className="col">
            <input
              onChange={handleMedicine}
              type="text"
              placeholder="Quantity"
            />
          </div>
          <div className="col">
            <i className="fas fa-plus-square fa-2x"></i>
          </div>
        </div> */}
        <Prescription onSubmit={handleAdd} />
        {addMedicine()}
        <div className="row">
          <button onClick={() => setMedicines(medicines + 1)}>
            Add Medicine
          </button>
        </div>
        <button
          type="button"
          onClick={addPatient}
          className="btn btn-info btn-block col-5 mt-4"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
}

export default AddPatient;

function Prescription({ onSubmit, key }) {
  const [medicineName, setMedicineName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAdd = () => {
    let obj = { medicineName, quantity };
    console.log(obj);
    onSubmit(obj);
    console.log("formCLass");
  };

  return (
    <div className="px-5 row mb-3">
      <input
        className="col"
        type="text"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
        placeholder="Medicine"
      />
      <input
        className="col offset-1"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Quantity"
      />

      <i className="fas fa-plus-square fa-2x col" onClick={handleAdd}></i>
    </div>
  );
}
