import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../img/logo.png";

function SignupPage() {
  const [username, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Signup Details:", { username, email, password });

    // Call API to create account
    // Redirect to login page
    fetch("http://localhost:5000/user/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        if (response.ok) {
          // Account created successfully
          navigate("/");
        } else {
          // Handle error response
          throw new Error("Failed to create account");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <Wrapper>
      <div className="container">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <h1>Create Account</h1>
        <form>
          <div className="row">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={username}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="row">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button onClick={handleSignup} type="button">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <a href="/">Login</a>
        </p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
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

export default SignupPage;
