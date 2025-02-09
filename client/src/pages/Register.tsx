import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUser } from "../API/AuthAPI";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const registerUser = useRegisterUser();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);

    // Check if passwords match
    if (password !== confirmPassword) {
      setAlertMessage("Passwords do not match!");
      setShowAlert(true);
      setLoading(false);
      return;
    }

    console.log(`Email: ${email}, Password: ${password}`);

    registerUser.mutateAsync(
      { email: email, password: password },
      {
        onSuccess: () => {
          setLoading(false);
          setAlertMessage("Registration successful!");
          setShowAlert(true);
          navigate("/");
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
        <div className="h4 mb-2 text-center">Register</div>

        {/* Alert */}
        {showAlert && (
          <Alert
            className="mb-2"
            variant={
              alertMessage === "Registration successful!" ? "success" : "danger"
            }
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          className="w-100"
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
        <div className="d-grid justify-content-end">
          <Link to={"/login"} className="text-muted px-0">
            Sign In
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
