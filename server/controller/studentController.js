const StudentModel = require("../data/studentModel");

// ADD new student
const newStudent = async (req, res) => {
  try {
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
};

// GET all students
const students = async (req, res) => {
  try {
    const allStudents = await StudentModel.findAll();
    res.json(allStudents);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET specific student
const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await StudentModel.findOne({ where: { id } });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    return res.json(student);
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// UPDATE student
const editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, isMale, birthdate } = req.body;

    const student = await StudentModel.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.update({ name, email, age, isMale, birthdate });

    return res.json({ message: "Student updated successfully", student });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE student
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await StudentModel.findByPk(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await student.destroy();
    return res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Database error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  newStudent,
  students,
  getStudent,
  editStudent,
  deleteStudent,
};
