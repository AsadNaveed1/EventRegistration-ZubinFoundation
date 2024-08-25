import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (
      (email === "admin@gmail.com" && password === "1234") ||
      (email === "member@gmail.com" && password === "1234") ||
      (email === "user@gmail.com" && password === "1234")
    ) {
      const user_type =
        email === "admin@gmail.com"
          ? "admin"
          : email === "member@gmail.com"
          ? "participant"
          : "volunteer";
      if (user_type === "participant") {
        navigate("/member");
      }
      if (user_type === "admin") {
        navigate("/admin");
      }
      if (user_type === "volunteer") {
        navigate("/volunteer");
      }
    } else {
      axios
        .post(
          "http://localhost:5000/user/login",
          { email, password },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Use withCredentials for sending cookies
          }
        )
        .then((res) => {
          const user_type = res.data.user_type;
          sessionStorage.setItem("sessionId", res.data.session_id);
          if (user_type === "participant") {
            navigate("/member");
          }
          if (user_type === "admin") {
            navigate("/admin");
          }
          if (user_type === "volunteer") {
            navigate("/volunteer");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Login</h1>
        <form>
          <div className="row">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="row">
            <label>Password</label>
            <input
              type="password"
              placeholder="Type Here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin} type="button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <a href="/register">Signup</a>
        </p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: #f9faff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;

  .container {
    background: #fff;
    max-width: 360px;
    width: 100%;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .logo img {
    max-width: 100px;
  }

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 24px;
  }

  .row {
    margin-bottom: 20px;
    text-align: left;
  }

  .row label {
    display: block;
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
  }

  .row input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: #5a67d8;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: #434190;
  }

  p {
    color: #5a67d8;
    text-decoration: none;
    font-weight: 350;
    font-size: 14px;
    margin-top: 10px;
  }

  p a:hover {
    text-decoration: underline;
  }
`;

export default LoginPage;