import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Hardcoded admin credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "admin123";

  // Form validation
  const validateForm = () => {
    if (!username || !password) {
      setError("Username and password are required.");
      return false;
    }

    setError("");
    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Check if the user is the admin
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Redirect to AddProduct page for admin
        navigate("/AddProduct");
      } else {
        // For regular users, send data to the API
        const data = new FormData();
        data.append("username", username);
        data.append("password", password);

        const response = await axios.post(
          "https://alvins.pythonanywhere.com/api/signin",
          data
        );

        // Check if the user exists in the server
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/"); // Redirect to the home page for regular users
        } else {
          setError(response.data.message || "Invalid username or password.");
        }
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4">
        <h2 className="text-center mb-4">Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={submitForm}>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" disabled={loading} className="w-100">
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/SignUp">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;