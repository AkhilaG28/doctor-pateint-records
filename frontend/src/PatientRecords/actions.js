import {
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,
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
    .then((res) => console.log(res));
};
