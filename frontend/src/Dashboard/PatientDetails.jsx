import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { deletePatientRecord } from "../PatientRecords/actions";

const Card = styled.div`
  border-radius: 15px;
  margin-top: 5%;
  padding: 1% 2%;
  background: linear-gradient(285deg, #d6aed6 0%, #98d9e1 99%);
`;

const Table = styled.table`
  margin-left: 42%;
  margin-top: 2%;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid white;
    text-align: center;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #cf6a87;
    color: white;
  }
`;

const Button = styled.button`
  background: crimson;
  border: 1px solid crimson;
  color: white;
  border-radius: 5px;
  margin-top: 2%;
`;

function PatientDetails() {
  const { patients, deleted } = useSelector((state) => state.Patient);
  let params = useParams();
  const history = useHistory();

  let patient = patients.find((item) => item._id == params.id);
  let prescription = JSON.parse(patient.prescription);

  const dispatch = useDispatch();

  const deletePatient = () => {
    dispatch(deletePatientRecord(params.id));
    history.push("/dashboard");
  };

  if (deleted) history.push("/dashboard");
  return (
    <>
      <Link
        to="/dashboard/allPatients"
        style={{ textDecoration: "none", color: "black", margin: "2%" }}
      >
        Go Back
      </Link>
      <Card className="card col-8 offset-2 mb-3">
        <div className="card-body">
          <div className="row text-center">
            <h2 className="card-title col">Name: {patient.name}</h2>
            <h5 className="card-text col mt-2">Age: {patient.age}</h5>
          </div>
          <div className="row text-center">
            <h5 className="card-text text-center col">Prescription:</h5>
          </div>

          <Table>
            <thead>
              <tr className="p-4" style={{ background: "#22a6b3" }}>
                <td>Medicine</td>
                <td>Qty</td>
              </tr>
            </thead>
            <tbody>
              {prescription.map((tabs, index) => (
                <tr key={index} className="p-4">
                  <td>{tabs.medicineName}</td>
                  <td>{tabs.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="row text-center">
            <Button className="col-4 offset-4" onClick={deletePatient}>
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}

export default PatientDetails;
