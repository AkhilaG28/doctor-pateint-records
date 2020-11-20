import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPatientRecord } from "../PatientRecords/actions";

export default function AddPatient() {
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

  const addRow = () => {
    setMedicines((prev) => prev + 1);
  };

  const addPatient = (e) => {
    e.preventDefault();
    let patientRecord = new FormData();
    for (let key in patientDetails) {
      patientRecord.append(key, patientDetails[key]);
    }
    patientRecord.append("prescription", JSON.stringify(prescription));
    patientRecord.append("docId", userData.userId);
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
        <Prescription onSubmit={handleAdd} />
        {addMedicine()}
        <div className="row">
          <button onClick={addRow}>Add Medicine</button>
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

function Prescription({ onSubmit, key }) {
  let pres = {
    medicineName: "",
    quantity: "",
  };
  const [prescrip, setPrescrip] = useState(pres);

  const handlePrescp = (e) => {
    const { name, value } = e.target;
    setPrescrip((state) => ({ ...state, [name]: value }));
  };

  const handleAdd = () => {
    let obj = prescrip;
    onSubmit(obj);
  };

  return (
    <div className="px-5 row mb-3">
      <input
        className="col"
        name="medicineName"
        type="text"
        value={prescrip.medicineName}
        onChange={handlePrescp}
        placeholder="Medicine"
      />
      <input
        name="quantity"
        className="col offset-1"
        type="number"
        value={prescrip.quantity}
        onChange={handlePrescp}
        placeholder="Quantity"
      />

      <i className="fas fa-plus-square fa-2x col" onClick={handleAdd}></i>
    </div>
  );
}
