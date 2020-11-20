import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientsRecords } from "../PatientRecords/actions";

function AllPatients() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.Auth);
  useEffect(() => {
    // console.log(userData);
    dispatch(getPatientsRecords(userData.userId));
  }, []);
  return (
    <div>
      <h1 className="mt-5 text-center">Patients Page</h1>
    </div>
  );
}

export default AllPatients;
