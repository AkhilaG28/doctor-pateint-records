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
} from "./actionTypes";

export const initialState = {
  isLoading: false,
  isError: false,
  patients: [],
  totalCount: "",
  errMsg: "",
  addedPatient: false,
  deleted: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_PATIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
        deleted: false,
      };

    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errMsg: "",
        deleted: false,
      };

    case ADD_PATIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
        deleted: false,
      };

    case GET_PATIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
        deleted: false,
      };

    case GET_PATIENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        patients: action.payload.current,
        totalCount: action.payload.totalCount,
        isError: false,
        errMsg: "",
        deleted: false,
      };

    case GET_PATIENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
        deleted: false,
      };

    case DELETE_PATIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
        deleted: false,
      };

    case DELETE_PATIENT_SUCCESS:
      let newList = state.patients.filter(
        (item) => item.id != action.payload.id
      );
      return {
        ...state,
        isLoading: false,
        patients: newList,
        totalCount: state.totalCount - 1,
        isError: false,
        errMsg: "",
        deleted: true,
      };

    case DELETE_PATIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
        deleted: false,
      };

    default:
      return state;
  }
};
