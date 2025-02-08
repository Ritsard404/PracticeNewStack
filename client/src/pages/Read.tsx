import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Student } from "./Home";

function Read() {
  const [student, setStudent] = useState<Student | null>(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getStudent/${id}`)
      .then((res) => {
        setStudent(res.data); // Store a single student object
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!student) {
    return <h2>Loading...</h2>; // Handle loading state
  }

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>User {id}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>
      <ul className="list-group">
        <li className="list-group-item">
          <b>ID: </b>
          {student.id}
        </li>
        <li className="list-group-item">
          <b>Name: </b>
          {student.name}
        </li>
        <li className="list-group-item">
          <b>Email: </b>
          {student.email}
        </li>
        <li className="list-group-item">
          <b>Age: </b>
          {student.age}
        </li>
        <li className="list-group-item">
          <b>Gender: </b>
          {student.isMale ? "Male" : "Female"}
        </li>
        <li className="list-group-item">
          <b>Birth Date: </b>
          {student.birthdate}
        </li>
      </ul>
    </div>
  );
}

export default Read;
