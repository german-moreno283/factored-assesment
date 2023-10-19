import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sha256 } from "js-sha256";
import "../styles/Login.css"

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    fetch(`http://localhost:8000/users/${form.username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.password !== sha256(form.password)) {
          alert("Wrong password");
          return;
        }
        navigate("/detail", { state: { userData: data } });
      })
      .catch((error) => {
        alert("Error fetching user data: " + error.message);
      });
  };
  
  return (
    <>
      <Container>
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleFormChange}
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleFormChange}
            />
            <br />

            <Button onClick={handleSubmit}>Log in</Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}
export default Login;
