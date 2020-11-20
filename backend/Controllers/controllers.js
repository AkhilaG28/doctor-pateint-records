const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { registerValidation, loginValidation } = require("../validation");
const Doctor = require("../Models/Doctor");

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
    user: { email: user.email, name: user.name, patients: user.patients },
  });
};

const checkUser = async (req, res) => {
  let loggedUser = await Doctor.findOne({ email: req.user.email });
  console.log(loggedUser);
  res.json(loggedUser);
};

const getPatientsRecords = async (req, res) => {
  const page = Number.parseInt(req.query.page);
  const limit = Number.parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let results = {};

  results.totalCount = await Doctor.countDocuments().exec();

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
    results.current = await Doctor.find().limit(limit).skip(startIndex).exec();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const postPatientRecord = async (req, res) => {
  console.log(req.body.prescription);

  let name = req.body.name;
  let age = req.body.age;
  let gender = req.body.gender;
  let avatar = req.file.path;
  let prescription = req.body.prescription;

  let newPatient = { name, age, gender, avatar, prescription };
  console.log("new patient", newPatient);

  let doctor = await Doctor.findOne({ email: req.body.docEmail });
  console.log(doctor);
  // doctor.patients.push(newPatient);
  // console.log(doctor);

  //   doctor
  //     .save()
  //     .then((newPatient) =>
  //       res
  //         .status(200)
  //         // .json({ message: "Patient added successfully", data:newPatient})
  //     )
  //     .catch((err) => res.status(400).json({ err: err }));
};

module.exports = {
  registerUser,
  checkUser,
  loginUser,
  getPatientsRecords,
  postPatientRecord,
  //   updatePatientRecord,
  //   deletePatientRecord,
};
