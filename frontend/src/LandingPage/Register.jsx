import React from "react";
import styles from "./regLog.module.css";
import { useState } from "react";
import classnames from "classnames";
import { registerUser } from "../Auth/actions";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Input = styled.input`
  background: transparent;
  outline: none;
  &:placeholder {
    color: crimson;
  }
  &:focus {
    outline: none;
  }
`;

function Register() {
  let initialState = {
    name: "",
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const [registerDetails, setRegisterDetails] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterDetails((state) => ({ ...state, [name]: value }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    // console.log(registerDetails);
    dispatch(registerUser(registerDetails));
  };

  const { register } = useSelector((state) => state.Auth);
  const history = useHistory();

  if (register) {
    history.push("/login");
  }

  return (
    <div className={styles.bg}>
      <form
        onSubmit={formSubmit}
        className={classnames("col-6 offset-3", styles.marginTop)}
      >
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Input
            onChange={handleChange}
            name="name"
            value={registerDetails.name}
            type="text"
            className="form-control"
            id="name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Email address</label>
          <Input
            onChange={handleChange}
            name="email"
            value={registerDetails.email}
            type="email"
            className="form-control"
            id="mail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input
            onChange={handleChange}
            name="password"
            value={registerDetails.password}
            type="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="form-group form-check">
          <Input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          type="submit"
          className={classnames("btn offset-3 btn-block col-6", styles.submit)}
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
