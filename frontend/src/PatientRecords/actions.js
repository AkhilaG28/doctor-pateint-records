import {
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILURE,
} from "./actionTypes";

import axios from "axios";

// add a patient record

export const addPatientRequest = () => ({
  type: ADD_PATIENT_REQUEST,
});

export const addPatientSuccess = (payload) => ({
  type: ADD_PATIENT_SUCCESS,
  payload,
});

export const addPatientFailure = (payload) => ({
  type: ADD_PATIENT_FAILURE,
  payload,
});

export const addPatientRecord = (payload) => (dispatch) => {
  dispatch(addPatientRequest());
  console.log(payload);
  axios
    .post("http://localhost:8000/addPatient", payload)
    .then((res) => dispatch(addPatientSuccess(res.data)))
    .catch((err) => dispatch(addPatientFailure(err)));
};

// get all patients

export const getPatientRequest = () => ({
  type: GET_PATIENTS_REQUEST,
});

export const getPatientSuccess = (payload) => ({
  type: GET_PATIENTS_SUCCESS,
  payload,
});

export const getPatientFailure = (payload) => ({
  type: GET_PATIENTS_FAILURE,
  payload,
});

export const getPatientsRecords = (payload) => (dispatch) => {
  dispatch(getPatientRequest());
  console.log(payload);
  axios
    .get(`http://localhost:8000/getPatients/${payload}`)
    .then((res) => dispatch(getPatientSuccess(res.data)))
    .catch((err) => dispatch(getPatientFailure(err)));
};
