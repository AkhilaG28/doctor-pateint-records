import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import authReducer from "./Auth/reducer";
import patientReducer from "./PatientRecords/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  Auth: authReducer,
  Patient: patientReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
