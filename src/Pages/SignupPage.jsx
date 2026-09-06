import { useState } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { signup as signupRequest } from "../api/auth.js";
import { useCurrentUser } from "../context/CurrentUserContext.jsx";

function SignupPage() {
  const { login } = useCurrentUser();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const user = await signupRequest(name, email, password);
      login(user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Could not sign up.");
    }
  }

  return (
    <Container style={{ maxWidth: 420 }}>
      <Card className="p-4">
        <h1 className="h3 mb-3">Sign up</h1>
        <p className="text-muted">
          New accounts are created as students. A manager or admin can
          promote your role later.
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            Sign up
          </Button>
        </Form>
        <p className="mt-3 mb-0 text-center">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </Card>
    </Container>
  );
}

export default SignupPage;
