import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getStudents, useDeleteStudent } from "../API/StudentAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { logout, setUser } from "../redux/AuthSlice";
import ValidateToken from "../API/ValidateToken";
import { jwtDecode } from "jwt-decode";

function Home() {
  // const [data, setData] = useState<Student[]>([]);

  const { data: students, refetch } = getStudents(); // Call the hook here

  const userId = useSelector((state: RootState) => state.auth.userId);
  const userEmail = useSelector((state: RootState) => state.auth.userEmail);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteStudent = useDeleteStudent();

  useEffect(() => {
    const isValid = ValidateToken();

    if (isValid) {
      const token = localStorage.getItem("token");
      if (!token) return;

      const decoded: any = jwtDecode(token);

      dispatch(
        setUser({
          userId: String(decoded.id),
          userEmail: decoded.email,
          token: decoded.token,
        })
      );
    } else {
      dispatch(logout()); // Clear auth state
      localStorage.removeItem("token"); // Remove expired token
      navigate("/"); // Redirect to login
    }
  }, [navigate, dispatch]);

  // // Function to fetch students
  // const fetchStudents = () => {
  //   axios
  //     .get<Student[]>("http://localhost:5000/api/student/students")
  //     .then((res) => {
  //       setData(res.data);
  //     })
  //     .catch((err) => console.error("Error fetching students:", err));
  // };

  // useEffect(() => {
  //   fetchStudents(); // Fetch data when the component mounts
  // }, []);

  // Function to handle delete action
  const handleDelete = (id: number) => {
    // axios
    //   .delete(`http://localhost:5000/api/student/deleteStudent/${id}`)
    //   .then(() => {
    //     refetch(); // Refresh data after deletion
    //     toast.error("Deleted");
    //   })
    //   .catch((err) => console.error("Error deleting student:", err));

    deleteStudent.mutateAsync(id, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container-fluid bg-primary vh-100 vw-100 text-white p-4">
      <h2>
        User {userId}: {userEmail}
        <h3>Students</h3>
      </h2>
      <div className="d-flex justify-content-end space-x-4 mb-3">
        <button className="btn btn-danger" onClick={() => handleLogout()}>
          {" "}
          Log Out
        </button>
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
          {students?.map((student) => (
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
