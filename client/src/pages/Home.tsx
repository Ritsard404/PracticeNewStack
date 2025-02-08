import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define Student type
export interface Student {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  isMale: boolean;
  birthdate: string;
}

function Home() {
  const [data, setData] = useState<Student[]>([]);

  // Function to fetch students
  const fetchStudents = () => {
    axios
      .get<Student[]>("http://localhost:5000/api/student/students")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Error fetching students:", err));
  };

  useEffect(() => {
    fetchStudents(); // Fetch data when the component mounts
  }, []);

  // Function to handle delete action
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:5000/api/student/deleteStudent/${id}`)
      .then(() => {
        fetchStudents(); // Refresh data after deletion
      })
      .catch((err) => console.error("Error deleting student:", err));
  };

  return (
    <div className="container-fluid bg-primary vh-100 vw-100 text-white p-4">
      <h3>Students</h3>
      <div className="d-flex justify-content-end mb-3">
        <Link className="btn btn-success" to="/create">
          Add Student
        </Link>
      </div>
      <table className="table table-striped table-bordered bg-light text-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>{student.gender || (student.isMale ? "Male" : "Female")}</td>
              <td>
                <Link
                  className="btn mx-2 btn-success"
                  to={`/read/${student.id}`}
                >
                  Read
                </Link>
                <Link
                  className="btn mx-2 btn-warning"
                  to={`/edit/${student.id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="btn mx-2 btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
