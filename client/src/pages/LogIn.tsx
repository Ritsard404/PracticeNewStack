import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../API/AuthAPI";
import ValidateToken from "../API/ValidateToken";
import { logout, setUser } from "../redux/AuthSlice";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  const [show, setShow] = useState<boolean>(false);

  const login = useLogInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await delay(500);

    login.mutateAsync(
      { email: userEmail, password: inputPassword },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: () => {
          setShow(true);
        },
      }
    );
  };

  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div className="sign-in__wrapper">
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="h4 mb-2 text-center">Sign In</div>
        {/* Alert */}
        {show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect email or password.
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            value={userEmail}
            placeholder="Email"
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          className="w-100"
          variant="primary"
          type="submit"
          disabled={login.isPending}
        >
          {login.isPending ? "Logging In..." : "Log In"}
        </Button>
        <div className="d-grid justify-content-end">
          <Link to={"/register"} className="text-muted px-0">
            Sign Up
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
