import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientsRecords } from "../PatientRecords/actions";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Card = styled.div`
  border-radius: 15px;
  padding: 1% 2%;
  background: linear-gradient(285deg, #d6aed6 0%, #98d9e1 99%);
  &:hover {
    background: linear-gradient(285deg, #48c3eb 0%, #718edd 99%);
    color: white;
  }
`;

const Div = styled.div`
  color: #fc427b;
  font-size: 40px;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  padding: 3px;
  border: 2px solid #fc427b;
`;

function AllPatients() {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.Auth);
  let { patients, totalCount } = useSelector((state) => state.Patient);
  patients = patients.map((item) => {
    if (!item.avatar.includes("http")) {
      item.avatar = item.avatar.split("/");
      item.avatar = `http://localhost:8000/uploads/${
        item.avatar[item.avatar.length - 1]
      }`;
      return item;
    } else return item;
  });
  useEffect(() => {
    // console.log(userData);
    dispatch(getPatientsRecords(userData.userId));
  }, []);
  return (
    <div>
      <h1 className="my-5 text-center">Patients Page</h1>
      {patients &&
        patients.map((item) => (
          <Div key={item._id}>
            <Card className="card col-8 offset-2 mb-2">
              <div className="row no-gutters">
                <div className="col-md-2">
                  <Image
                    src={item.avatar}
                    className="card-img"
                    alt={item.name}
                  />
                </div>
                <div className="col-md-9 mt-1">
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                  </div>
                </div>
                <div className="col-md-1">
                  <Link
                    to={`/patientDetails/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="mt-2 text-white">...</div>
                  </Link>
                </div>
              </div>
            </Card>
          </Div>
        ))}
    </div>
  );
}

export default AllPatients;
