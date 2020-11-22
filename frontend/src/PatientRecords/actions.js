import {
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILURE,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILURE,
  CHANGE_QUERIES,
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

export const getPatientsRecords = (payload, page, name, gender, sort) => (
  dispatch
) => {
  dispatch(getPatientRequest());
  // console.log(payload, page, name, gender);
  axios
    .get(
      `http://localhost:8000/getPatients/${payload}?page=${page}&limit=5&name=${name}&filter=${gender}&sort=${sort}`
    )
    .then((res) => {
      console.log(res);
      dispatch(getPatientSuccess(res.data));
    })
    .catch((err) => dispatch(getPatientFailure(err)));
};

// delete a patient record

export const deletePatientRequest = () => ({
  type: DELETE_PATIENT_REQUEST,
});

export const deletePatientSuccess = (payload) => ({
  type: DELETE_PATIENT_SUCCESS,
  payload,
});

export const deletePatientFailure = (payload) => ({
  type: DELETE_PATIENT_FAILURE,
  payload,
});

export const deletePatientRecord = (payload) => (dispatch) => {
  dispatch(deletePatientRequest());
  console.log(payload);
  axios
    .delete(`http://localhost:8000/patient/delete/${payload}`)
    .then((res) => dispatch(deletePatientSuccess(res.data)))
    .catch((err) => dispatch(deletePatientFailure(err)));
};

// change queries

export const changeQueries = (payload) => ({
  type: CHANGE_QUERIES,
  payload,
});
