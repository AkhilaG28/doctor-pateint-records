import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 15px;
  margin-top: 5%;
  padding: 1% 2%;
  background: linear-gradient(285deg, #d6aed6 0%, #98d9e1 99%);
`;

function PatientDetails() {
  const { patients } = useSelector((state) => state.Patient);
  let params = useParams();

  let patient = patients.find((item) => item._id == params.id);
  let prescription = JSON.parse(patient.prescription);
  //   console.log(prescription);
  return (
    <Card className="card col-8 offset-2 mb-3">
      <div className="card-body">
        <div className="row text-center">
          <h2 className="card-title col">Name: {patient.name}</h2>
          <h5 className="card-text col mt-2">Age: {patient.age}</h5>
        </div>
        <div className="row text-center">
          <h5 className="card-text text-center col">Prescription:</h5>
        </div>

        <table>
          <thead>
            <tr>Medicine</tr>
            <tr>Qty</tr>
          </thead>
          <tbody>
            {prescription.map((tabs, index) => (
              <div key={index}>
                <tr>{tabs.medicineName}</tr>
                <tr>{tabs.quantity}</tr>
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default PatientDetails;
