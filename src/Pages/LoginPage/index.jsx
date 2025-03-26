import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [requestResponse, setRequestResponse] = useState({
    message: "",
    alertClassName: "",
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values) => {
    values = {
      ...values,
      usernameOrEmail: values.email,
    };
    axios
      .post("http://localhost:8081/api/auth/login", values)
      .then((response) => {
        setRequestResponse({
          message: "User Logged In successfully. Redirecting...",
          alertClassName: "alertSuccess",
        });
        localStorage.setItem("token", response.data);
        navigate("/");
      })
      .catch(() => {
        setRequestResponse({
          message: "Invalid email or password",
          alertClassName: "alertError",
        });
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Enter a valid email").required("Email required"),
    password: Yup.string()
      .required("Password required")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        {requestResponse.message && (
          <div className={styles[requestResponse.alertClassName]}>
            {requestResponse.message}
          </div>
        )}
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Sign in to continue</p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div className={styles.inputGroup}>
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  className={`${styles.inputField} ${
                    formik.errors.email && formik.touched.email
                      ? styles.inputError
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  className={`${styles.inputField} ${
                    formik.errors.password && formik.touched.password
                      ? styles.inputError
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>

              <button
                type="submit"
                className={styles.loginButton}
                disabled={!formik.isValid}
              >
                Login
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.loginText}>
          New user?{" "}
          <Link to="/register" className={styles.loginLink}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
