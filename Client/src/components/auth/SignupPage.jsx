import React, { useState } from 'react';
import axios from '../axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import logo from "../img/logo.png";

function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = (values) => {
    const { fullName, email, password, confirmPassword, gender, userType, adminCode, ethnicity, age, residence, interests } = values;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Signup Details:", { fullName, email, password });

    // Call API to create account
    axios.post("http://localhost:5000/signup/", {
      fullName,
      email,
      password,
      gender,
      userType,
      adminCode,
      ethnicity,
      age,
      residence,
      interests,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Use withCredentials for sending cookies
    })
      .then((response) => {
        if (response.status === 200) {
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
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            gender: '',
            userType: '',
            adminCode: '',
            ethnicity: '',
            age: '',
            residence: '',
            interests: [],
          }}
          validationSchema={Yup.object({
            fullName: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
            gender: Yup.string().required('Required'),
            userType: Yup.string().required('Required'),
            adminCode: Yup.string().when('userType', {
              is: 'admin',
              then: Yup.string().required('Admin code is required'),
            }),
            ethnicity: Yup.string().required('Required'),
            age: Yup.number().required('Required'),
            residence: Yup.string().required('Required'),
            interests: Yup.array().min(1, 'At least one interest must be selected').required('Required'),
          })}
          onSubmit={handleSignup}
        >
          {({ values }) => (
            <Form>
              <div className="row">
                <label>Full Name</label>
                <Field type="text" name="fullName" placeholder="Enter your full name" />
                <ErrorMessage name="fullName" component="div" className="error" />
              </div>
              <div className="row">
                <label>Email</label>
                <Field type="email" name="email" placeholder="Email@example.com" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="row">
                <label>Password</label>
                <Field type="password" name="password" placeholder="Create a password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="row">
                <label>Confirm Password</label>
                <Field type="password" name="confirmPassword" placeholder="Confirm your password" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
              <div className="row">
                <label>Gender</label>
                <Field as="select" name="gender">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="error" />
              </div>
              <div className="row">
                <label>User Type</label>
                <Field as="select" name="userType">
                  <option value="">Select user type</option>
                  <option value="participant">Participant</option>
                  <option value="admin">Admin</option>
                  <option value="volunteer">Volunteer</option>
                </Field>
                <ErrorMessage name="userType" component="div" className="error" />
              </div>
              {values.userType === 'admin' && (
                <div className="row">
                  <label>Admin Code</label>
                  <Field type="text" name="adminCode" placeholder="Enter admin code" />
                  <ErrorMessage name="adminCode" component="div" className="error" />
                </div>
              )}
              <div className="row">
                <label>Ethnicity</label>
                <Field type="text" name="ethnicity" placeholder="Enter your ethnicity" />
                <ErrorMessage name="ethnicity" component="div" className="error" />
              </div>
              <div className="row">
                <label>Age</label>
                <Field type="number" name="age" placeholder="Enter your age" />
                <ErrorMessage name="age" component="div" className="error" />
              </div>
              <div className="row">
                <label>City of Residence</label>
                <Field as="select" name="residence">
                  <option value="">Select your city of residence</option>
                  <option value="kowloon">Kowloon</option>
                  <option value="new territories">New Territories</option>
                  <option value="hong kong island">Hong Kong Island</option>
                </Field>
                <ErrorMessage name="residence" component="div" className="error" />
              </div>
              <div className="row">
                <label>Interests</label>
                <div role="group" aria-labelledby="checkbox-group">
                  <label>
                    <Field type="checkbox" name="interests" value="women and girls" />
                    Women and Girls
                  </label>
                  <label>
                    <Field type="checkbox" name="interests" value="mental health" />
                    Mental Health
                  </label>
                  <label>
                    <Field type="checkbox" name="interests" value="careers" />
                    Careers
                  </label>
                  <label>
                    <Field type="checkbox" name="interests" value="emergency relief" />
                    Emergency Relief
                  </label>
                  <label>
                    <Field type="checkbox" name="interests" value="family" />
                    Family
                  </label>
                </div>
                <ErrorMessage name="interests" component="div" className="error" />
              </div>
              <button type="submit">Sign Up</button>
            </Form>
          )}
        </Formik>
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
    max-width: 720px; /* Increase the max-width to take up more space horizontally */
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
    display: flex;
    flex-direction: column;
  }

  .row label {
    display: block;
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
  }

  .row input,
  .row select {
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

  p a {
    text-decoration: underline;
  }

  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
`;

export default SignupPage;
