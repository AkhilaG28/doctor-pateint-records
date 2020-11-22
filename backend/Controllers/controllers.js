const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { registerValidation, loginValidation } = require("../validation");
const Doctor = require("../Models/Doctor");
const Patients = require("../Models/Patients");

const registerUser = async (req, res) => {
  const { error } = registerValidation(req.body);

  if (error) res.status(400).send(error.details[0].message);

  const emailExists = await Doctor.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).send("Email already exists");

  const hashedPassword = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(12)
  );

  const newDoctor = new Doctor({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedDoctor = await newDoctor.save();
    res.send(savedDoctor);
  } catch (err) {
    res.status(400).send(err);
  }
};

const loginUser = async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) res.status(400).send(error.details[0].message);

  const user = await Doctor.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email does not exist");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Password is incorrect");

  //   console.log("user", user);

  const loginUser = { email: req.body.email };

  const accessToken = jwt.sign(loginUser, process.env.SECRET_KEY, {
    expiresIn: "150s",
  });

  res.status(200).json({
    message: "Login Successful",
    accessToken: accessToken,
    user: { email: user.email, name: user.name, userId: user._id },
  });
};

const checkUser = async (req, res) => {
  let loggedUser = await Doctor.findOne({ email: req.user.email });
  // console.log(loggedUser);
  res.json(loggedUser);
};

const getPatientsRecords = async (req, res) => {
  // console.log(req.query);
  const page = Number.parseInt(req.query.page);
  const limit = Number.parseInt(req.query.limit);
  const search = req.query.name;
  const gender = req.query.filter;
  const sort = req.query.sort === "asc" ? 1 : req.query.sort === "all" ? 0 : -1;
  // console.log(search);

  // searchParams[]

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let searchParams = {
    docId: req.params.id,
  };
  // name: JSON.parse(JSON.stringify(`/${search}/`)),
  // name: /a/,
  if (gender !== "all") {
    searchParams["gender"] = gender;
  }

  if (search !== "all") {
    searchParams["name"] = search;
  }

  // console.log(searchParams.name);
  // console.log(typeof searchParams.name);

  let docPatients = await Patients.countDocuments(searchParams);

  // console.log("doc", docPatients);
  let results = {};

  results.totalCount = docPatients;
  if (endIndex < results.totalCount) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit: limit,
    };
  }

  try {
    results.current = await Patients.find(searchParams)
      .sort({ age: sort })
      .limit(limit)
      .skip(startIndex)
      .exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const postPatientRecord = async (req, res) => {
  let name = req.body.name;
  let age = req.body.age;
  let gender = req.body.gender;
  let avatar = req.file.path;
  let prescription = req.body.prescription;
  let docId = req.body.docId;

  let newPatient = new Patients({
    name,
    age,
    gender,
    avatar,
    prescription,
    docId,
  });
  // console.log("new patient", newPatient);
  try {
    newPatient
      .save()
      .then((newPatient) =>
        res
          .status(200)
          .json({ message: "Patient added successfully", data: newPatient })
      );
  } catch (error) {
    res.status(400).json({ err: error });
  }
};

const deletePatientRecord = (req, res) => {
  let id = req.params.id;
  Patients.findByIdAndDelete(id)
    .then((result) =>
      res
        .status(200)
        .json({ message: "Patient Record deleted successfully", data: result })
    )
    .catch((err) => res.status(400).json({ error: err }));
};

module.exports = {
  registerUser,
  checkUser,
  loginUser,
  getPatientsRecords,
  postPatientRecord,
  //   updatePatientRecord,
  deletePatientRecord,
};
