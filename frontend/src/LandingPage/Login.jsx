import React, { useState } from "react";
import styles from "./regLog.module.css";
import styled from "styled-components";
import classnames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Auth/actions";
import { useHistory, Link } from "react-router-dom";

const Input = styled.input`
  outline: none;
  &:placeholder {
    color: crimson;
  }
  &:focus {
    outline: none;
  }
`;

function Login() {
  let initialState = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const [loginDetails, setLoginDetails] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails((state) => ({ ...state, [name]: value }));
  };

  const formSubmit = (e) => {
    e.preventDefault();
    // console.log(loginDetails);
    dispatch(loginUser(loginDetails));
  };

  const { login } = useSelector((state) => state.Auth);
  const history = useHistory();

  if (login) {
    history.push("/dashboard");
  }

  return (
    <div className={styles.bg}>
      <form
        onSubmit={formSubmit}
        className={classnames("col-6 offset-3", styles.marginTop)}
      >
        <div className="form-group">
          <label htmlFor="mail">Email address</label>
          <Input
            onChange={handleChange}
            name="email"
            value={loginDetails.email}
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
            value={loginDetails.password}
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
          Login
        </button>
        <div className="mt-3">
          Didn't register yet?
          <Link
            to="/register"
            style={{
              textDecoration: "none",
              color: "black",
              marginLeft: "4px",
            }}
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
