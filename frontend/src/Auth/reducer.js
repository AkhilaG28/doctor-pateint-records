import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT,
} from "./actionTypes";

import { loadData, saveData } from "../localStorage";

export const initialState = {
  isLoading: false,
  isError: false,
  userData: loadData("docUser") || [],
  errMsg: "",
  login: false,
  register: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
      };

    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        errMsg: "",
        register: true,
      };

    case REGISTER_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
      };

    case LOGIN_USER_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
        errMsg: "",
      };

    case LOGIN_USER_SUCCESS:
      saveData("docUser", action.payload.user);
      return {
        ...state,
        isLoading: false,
        isError: false,
        errMsg: "",
        login: true,
        userData: action.payload.user,
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errMsg: action.payload,
      };

    case LOGOUT:
      // console.log('logout');
      saveData("docUser", []);
      return {
        ...state,
        login: false,
      };

    default:
      return state;
  }
};
