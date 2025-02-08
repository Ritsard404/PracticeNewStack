const express = require("express");
const {
  deleteStudent,
  editStudent,
  getStudent,
  newStudent,
  students,
} = require("../controller/studentController");

const router = express.Router();

router.post("/newStudent", newStudent);
router.get("/students", students);
router.get("/getStudent/:id", getStudent);
router.put("/editStudent/:id", editStudent);
router.delete("/deleteStudent/:id", deleteStudent);

module.exports = router;
