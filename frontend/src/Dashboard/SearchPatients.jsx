import React, { useState } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch, useSelector } from "react-redux";
import { getPatientsRecords } from "../PatientRecords/actions";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

function SearchPatients(props) {
  const classes = useStyles();

  return (
    <div className="text-center mb-5">
      <TextField
        className={classes.margin}
        style={{ textAlign: "center" }}
        name="searchPatient"
        value={props.patientName}
        onChange={props.onChange}
        id="input-with-icon-textfield"
        label="Search Patients"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon onClick={props.onClick} />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

export default SearchPatients;
