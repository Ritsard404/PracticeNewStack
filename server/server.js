const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const StudentModel = require("./data/studentModel");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "200303",
//   database: "sampledb",
// });

// ADD new student
app.post("/add_user", async (req, res) => {
  try {
    // Create a new student record using Sequelize
    const newStudent = await StudentModel.create({
      name: req.body.name,
      email: req.body.email,
      age: parseInt(req.body.age, 10),
      gender: req.body.gender,
      isMale: req.body.isMale,
      birthdate: new Date(req.body.birthdate),
    });

    return res.json({
      success: "Student added successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error inserting student:", error);
    return res
      .status(500)
      .json({ message: "Something unexpected occurred: " + error.message });
  }
});

// GET all students
app.get("/students", async (req, res) => {
  try {
    const allStudents = await StudentModel.findAll();
    res.json(allStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET specific student
app.get("/getStudent/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find student by id
    // const student = await StudentModel.findByPk(id);
    const student = await StudentModel.findOne({ where: { id } });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json(student);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// UPDATE student
app.put("/editStudent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, isMale, birthdate } = req.body;

    // Find the student ID
    const student = await StudentModel.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // UPDATE student details
    await student.update({ name, email, age, isMale, birthdate });

    return res.json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// DELETE student
app.delete("/deleteStudent/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Find the student ID
    const student = await StudentModel.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // DELETE student details
    await student.destroy();
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
