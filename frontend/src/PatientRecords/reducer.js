import {
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,
  GET_PATIENTS_REQUEST,
  GET_PATIENTS_SUCCESS,
  GET_PATIENTS_FAILURE,
} from "./actionTypes";

export const initialState = {
  isLoading: false,
  isError: false,
  patients: [],
  totalCount: "",
  errMsg: "",
  addedPatient: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PATIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
      };

    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errMsg: "",
      };

    case ADD_PATIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
      };

    case GET_PATIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
      };

    case GET_PATIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patients: action.payload.current,
        totalCount: action.payload.totalCount,
        isError: false,
        errMsg: "",
      };

    case GET_PATIENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
      };

    default:
      return state;
  }
};
