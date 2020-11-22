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
import { loadData, saveData } from "../localStorage";

export const initialState = {
  isLoading: false,
  isError: false,
  patients: [],
  totalCount: "",
  urlParams: loadData("docUrl") || [
    { name: "all", sortOrder: "sort", filter: "all", page: 1 },
  ],
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
        addedPatient: false,
      };

    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errMsg: "",
        deleted: false,
        addedPatient: true,
      };

    case ADD_PATIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
        deleted: false,
        addedPatient: false,
      };

    case GET_PATIENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
        deleted: false,
        addedPatient: false,
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
        addedPatient: false,
      };

    case GET_PATIENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
        deleted: false,
        addedPatient: false,
      };

    case DELETE_PATIENT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
        deleted: false,
        addedPatient: false,
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
        addedPatient: false,
      };

    case DELETE_PATIENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
        deleted: false,
        addedPatient: false,
      };

    case CHANGE_QUERIES:
      saveData("docUrl", action.payload);
      console.log(action.payload);
      return {
        ...state,
        urlParams: action.payload,
      };

    default:
      return state;
  }
};
