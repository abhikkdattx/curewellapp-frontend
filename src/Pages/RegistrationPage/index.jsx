import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [requestResponse, setRequestResponse] = useState({
    message: "",
    alertClassName: "",
  });

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    password: "",
  };

  const onSubmit = (values) => {
    values = {
      ...values,
      username: values.email,
      role: "DOCTOR",
    };
    axios
      .post("http://localhost:8081/api/auth/register", values)
      .then(() => {
        setRequestResponse({
          message: "User Registered successfully. Redirecting...",
          alertClassName: "alertSuccess",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch(() => {
        setRequestResponse({
          message: "Registration failed",
          alertClassName: "alertError",
        });
      });
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name required"),
    email: Yup.string().email("Enter a valid email").required("Email required"),
    mobile: Yup.string().required("Mobile required"),
    password: Yup.string()
      .required("Password required")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <div className={styles.registerContainer}>
      <div className={styles.card}>
        {requestResponse.message && (
          <div className={styles[requestResponse.alertClassName]}>
            {requestResponse.message}
          </div>
        )}
        <h2 className={styles.title}>Create an Account</h2>
        <p className={styles.subtitle}>Sign up to get started</p>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div className={styles.inputGroup}>
                <label>Name</label>
                <Field
                  type="text"
                  name="name"
                  className={`${styles.inputField} ${
                    formik.errors.name && formik.touched.name
                      ? styles.inputError
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={styles.error}
                />
              </div>

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
                <label>Mobile</label>
                <Field
                  type="text"
                  name="mobile"
                  className={`${styles.inputField} ${
                    formik.errors.mobile && formik.touched.mobile
                      ? styles.inputError
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="mobile"
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
                className={styles.registerButton}
                disabled={!formik.isValid}
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <p className={styles.registerText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.registerLink}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
