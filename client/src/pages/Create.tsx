import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useNewStudent } from "../API/StudentAPI";

function Create() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    age: 0,
    gender: "Male",
    isMale: true,
    birthdate: new Date(),
  });

  const [error, setError] = useState("");

  const newStudent = useNewStudent();

  // Get today's date in YYYY-MM-DD format for the "max" attribute
  const today = new Date().toISOString().split("T")[0];

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // Normalize today to remove time

    if (selectedDate >= todayDate) {
      setError("Birthdate cannot be today or a future date.");
      setValues({ ...values, birthdate: new Date() });
    } else {
      setError("");
      setValues({ ...values, birthdate: selectedDate });
    }
  };

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      ...values,
      age: Number(values.age), // ✅ Ensure number
      birthdate: values.birthdate, // ✅ Already in YYYY-MM-DD format
    };

    // axios
    //   .post("http://localhost:5000/api/student/newStudent", payload)
    //   .then((res) => {
    //     navigate("/");
    //     console.log(res);
    //   })
    //   .catch((err) => console.log(err));

    newStudent.mutateAsync(payload, {
      onSuccess: () => {
        navigate("/");
      },
    });
  }

  return (
    <div className="container">
      <div className="row">
        <h3>Add Student</h3>
        <div className="d-flex justify-content-end">
          <Link to="/" className="btn btn-success">
            Home
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              name="age"
              required
              onChange={
                (e) => setValues({ ...values, age: Number(e.target.value) }) // ✅ Ensure number
              }
            />
          </div>
          <div className="form-group my-3">
            <label htmlFor="gender">Gender</label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={values.gender === "Male"}
              onChange={() =>
                setValues({ ...values, gender: "Male", isMale: true })
              } // ✅ Store "Male"
              required
            />{" "}
            Male
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={values.gender === "Female"}
              onChange={() =>
                setValues({ ...values, gender: "Female", isMale: false })
              } // ✅ Store "Female"
              required
            />{" "}
            Female
          </div>
          <div className="form-group my-3">
            <label htmlFor="birthdate">birthdate</label>
            <input
              type="date"
              name="birthdate"
              required
              onChange={handleBirthdateChange} // Use the function you created
              max={today}
            />
          </div>{" "}
          {error && <p className="text-red-500">{error}</p>}
          <div className="form-group my-3">
            <button type="submit" className="btn btn-success">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
