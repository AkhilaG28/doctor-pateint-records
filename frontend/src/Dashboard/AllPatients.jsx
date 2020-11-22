import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientsRecords, changeQueries } from "../PatientRecords/actions";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";
import SearchPatients from "./SearchPatients";

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
  const history = useHistory();
  const { userData } = useSelector((state) => state.Auth);
  let { patients, totalCount, docUrl } = useSelector((state) => state.Patient);

  const [filterGender, setFilterGender] = useState("all");

  const [activePage, setActivePage] = useState(1);

  patients = patients.map((item) => {
    if (!item.avatar.includes("http")) {
      item.avatar = item.avatar.split("/");
      item.avatar = `http://localhost:8000/uploads/${
        item.avatar[item.avatar.length - 1]
      }`;
      return item;
    } else return item;
  });
  const [patientName, setPatientName] = useState("all");
  let totalPages = Math.ceil(totalCount / 5);

  useEffect(() => {
    let payload = {
      name: patientName,
      sortOrder: sort,
      page: activePage,
      filter: filterGender,
    };
    // console.log(docUrl);
    dispatch(changeQueries(payload));
    // dispatch(
    //   getPatientsRecords(
    //     userData.userId,
    //     docUrl.page || activePage,
    //     docUrl.name || patientName,
    //     docUrl.filter || filterGender,
    //     docUrl.sortOrder || sort
    //   )
    // );
    history.push(
      `/dashboard/allPatients/${
        userData.userId
      }?page=${1}&limit=5&name=${patientName}&filter=all&sort=${sort}`
    );
  }, []);

  const handleChange = (e) => {
    setPatientName(e.target.value);
  };

  const searchPatient = (e) => {
    dispatch(
      getPatientsRecords(userData.userId, 1, patientName, filterGender, sort)
    );
    let payload = {
      name: patientName,
      sortOrder: sort,
      page: activePage,
      filter: filterGender,
    };
    dispatch(changeQueries(payload));
    history.push(
      `/dashboard/allPatients/${
        userData.userId
      }?page=${1}&limit=5&name=${patientName}&filter=${filterGender}&sort=${sort}`
    );
  };

  const handlePageChange = (e, value) => {
    setActivePage(value);
  };

  const [sort, setSortOrder] = useState("sort");

  const setSort = (e) => {
    setSortOrder(e.target.value);
  };

  useEffect(() => {
    dispatch(
      getPatientsRecords(
        userData.userId,
        activePage,
        patientName,
        filterGender,
        sort
      )
    );
    let payload = {
      name: patientName,
      sortOrder: sort,
      page: activePage,
      filter: filterGender,
    };
    dispatch(changeQueries(payload));
    history.push(
      `/dashboard/allPatients/${userData.userId}?page=${activePage}&limit=5&name=${patientName}&filter=${filterGender}&sort=${sort}`
    );
  }, [activePage, filterGender, sort]);

  return (
    <div>
      <h1 className="my-5 text-center">Patients Page</h1>
      <SearchPatients
        onChange={handleChange}
        onClick={searchPatient}
        patientName={patientName}
      />
      <div className="row text-center offset-2 col-8 mb-5">
        <div className="col mt-2">
          <div className="form-check form-check-inline ml-4">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              onChange={() => setFilterGender("Male")}
              id="male"
              value="Male"
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              onChange={() => setFilterGender("Female")}
              id="female"
              value="Female"
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              onChange={() => setFilterGender("Other")}
              id="other"
              value="Other"
            />
            <label className="form-check-label" htmlFor="other">
              Other
            </label>
          </div>
        </div>
        <div className="col mt-2">
          <select name="age" onChange={setSort}>
            <option value="sort">Sort By Age</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      <Pagination
        count={totalPages}
        onChange={handlePageChange}
        style={{
          clear: "both",
          marginLeft: "40%",
          outline: "none",
          marginBottom: "3%",
        }}
        color="secondary"
      />
      {patients &&
        patients.map((item) => (
          <Div key={item._id}>
            <Card className="card col-10 offset-1 mb-2">
              <div className="row no-gutters">
                <div className="col-md-2">
                  <Image
                    src={item.avatar}
                    className="card-img"
                    alt={item.name}
                  />
                </div>
                <div className="col-md-4 mt-1">
                  <div className="card-body">
                    <h2 className="card-title">{item.name}</h2>
                  </div>
                </div>
                <div className="col-md-3 mt-3">
                  <div className="card-body">
                    <h2
                      className="card-title text-dark"
                      style={{ fontSize: "20px" }}
                    >
                      Medicines: {JSON.parse(item.prescription).length}
                    </h2>
                  </div>
                </div>
                <div className="col-md-2 mt-3">
                  <div className="card-body">
                    <h2
                      className="card-title text-dark"
                      style={{ fontSize: "20px" }}
                    >
                      Age: {item.age}
                    </h2>
                  </div>
                </div>
                <div className="col-md-1">
                  <Link
                    to={`/patientDetails/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="mt-2 text-dark">...</div>
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
