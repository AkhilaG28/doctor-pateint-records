import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPatientRecord } from "../PatientRecords/actions";
import { useHistory } from "react-router-dom";

export default function AddPatient() {
  let initialState = {
    gender: "",
    name: "",
    age: "",
    avatar: "",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const { userData } = useSelector((state) => state.Auth);
  const { addedPatient } = useSelector((state) => state.Patient);
  const [patientDetails, setPatientDetails] = useState(initialState);
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file")
      setPatientDetails({ ...patientDetails, avatar: e.target.files[0] });
    else setPatientDetails({ ...patientDetails, [name]: value });
  };

  const [prescription, setPrescription] = useState([
    { medicineName: "", quantity: "" },
  ]);

  const handlePrescp = (e, index) => {
    const { name, value } = e.target;
    const list = [...prescription];
    list[index][name] = value;
    setPrescription(list);
  };

  const handleAdd = () => {
    setPrescription([...prescription, { medicineName: "", quantity: "" }]);
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
    // console.log("pres", prescription);
  };

  // if (addedPatient) {
  //   alert("Patient added to records");
  //   addedPatient = false;
  //   history.push("/dashboard/allPatients");
  // }

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

        {prescription.map((item, i) => (
          <div className="row text-center" key={i}>
            <input
              className="col"
              name="medicineName"
              type="text"
              value={item.medicineName}
              onChange={(e) => handlePrescp(e, i)}
              placeholder="Medicine"
            />
            <input
              name="quantity"
              className="col offset-1"
              type="number"
              value={item.quantity}
              onChange={(e) => handlePrescp(e, i)}
              placeholder="Quantity"
            />

            {prescription.length - 1 === i && (
              <i
                className="fas fa-plus-square fa-2x col"
                onClick={handleAdd}
              ></i>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addPatient}
          style={{ background: "#d6aed6" }}
          className="btn btn-block col-6 offset-3 mt-4"
        >
          Add Patient
        </button>
      </form>
    </div>
  );
}
