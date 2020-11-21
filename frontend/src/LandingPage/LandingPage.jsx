import React from "react";
import styles from "./landingPage.module.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <div className="container">
        <div className="row mt-4 font-weight-bold">
          <div className="col">
            <img
              src="https://www.ehealth102.com/wp-content/uploads/2019/04/ehealth-_logo.jpg"
              className={styles.logo}
              alt=""
            />
          </div>
          <div className="col mt-2">Home</div>
          <div className="col mt-2">About Us</div>
          <div className="col mt-2">Ehealth Care</div>
          <div className="col mt-2">Blogs</div>
          <div className="col mt-2">Contact Us</div>
          <div className="col ">
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <button className="btn btn-danger">SIGN IN</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="container-fluid" style={{ position: "relative" }}>
        <div className="row">
          <div className="col">
            <h1 className={styles.title}>
              Welcome to
              <span style={{ color: "#d7263c", marginLeft: "6px" }}>
                eHealth Records
              </span>
              <br />
              <p
                style={{ fontSize: 20, marginLeft: 80 }}
                className="text-muted mt-3"
              >
                - All your patient records at one place
              </p>
            </h1>
          </div>
          <div className="col">
            <img src="doctor.jpeg" alt="" className={styles.doc} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
