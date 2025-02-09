import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { Student } from "./Home";
import { getStudent, useEditStudent } from "../API/StudentAPI";
import { toast } from "react-toastify";

function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [values, setValues] = useState({
    name: "",
    email: "",
    age: "",
    isMale: false,
    birthdate: new Date(),
  });

  const editStudent = useEditStudent(id!);
  const { data: student, isLoading } = getStudent(id!);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:5000/api/student/getStudent/${id}`)
  //     .then((res) => {
  //       const studentData = res.data;
  //       setValues({
  //         name: studentData.name,
  //         email: studentData.email,
  //         age: studentData.age,
  //         isMale: studentData.isMale,
  //         birthdate: new Date(studentData.birthdate),
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);

    if (selectedDate >= todayDate) {
      setError("Birthdate cannot be today or a future date.");
    } else {
      setError("");
      setValues({ ...values, birthdate: selectedDate });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...values,
      birthdate: values.birthdate.toISOString().split("T")[0],
    };

    editStudent.mutateAsync(payload, {
      onSuccess: () => {
        toast.success("Edit successful");
        navigate("/");
      },
      onError: (err) => {
        console.log(err);
      },
    });

    // axios
    // .put(`http://localhost:5000/api/student/editStudent/${id}`, payload)

    // .then(() => navigate("/"))
    // .catch((err) => console.log(err));
  };

  const today = new Date().toISOString().split("T")[0];

  if (isLoading) return <>Loading</>;

  return (
    <div className="container-fluid vw-100 vh-100 bg-primary">
      <h1>Edit User {id}</h1>
      <Link to="/" className="btn btn-success">
        Back
      </Link>

      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={student?.name}
            required
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={student?.email}
            required
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />
        </div>

        <div className="form-group my-3">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            name="age"
            value={student?.age}
            required
            onChange={(e) => setValues({ ...values, age: e.target.value })}
          />
        </div>

        <div className="form-group my-3">
          <label>Gender</label>
          <input
            type="radio"
            name="gender"
            checked={student?.isMale}
            onChange={() => setValues({ ...values, isMale: true })}
            required
          />{" "}
          Male
          <input
            type="radio"
            name="gender"
            checked={!student?.isMale}
            onChange={() => setValues({ ...values, isMale: false })}
            required
          />{" "}
          Female
        </div>

        <div className="form-group my-3">
          <label htmlFor="birthdate">Birthdate</label>
          <input
            type="date"
            name="birthdate"
            value={student?.birthdate.toString().split("T")[0]}
            required
            onChange={handleBirthdateChange}
            max={today}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}

        <div className="form-group my-3">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default Edit;
