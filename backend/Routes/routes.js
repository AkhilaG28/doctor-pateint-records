const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const {
  registerUser,
  checkUser,
  loginUser,
  getPatientsRecords,
  postPatientRecord,
  //   updatePatientRecord,
  deletePatientRecord,
} = require("../Controllers/controllers");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/register/new", registerUser);

router.post("/login/user", loginUser);

router.get("/check/user", authenticateToken, checkUser);

router.get("/getPatients/:id", getPatientsRecords);

router.post("/addPatient", upload.single("avatar"), postPatientRecord);

// router.put("/api/patient/update/:id", updatePatientRecord);

router.delete("/patient/delete/:id", deletePatientRecord);

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

module.exports = router;
