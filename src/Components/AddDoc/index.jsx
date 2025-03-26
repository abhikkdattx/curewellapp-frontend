import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import ApiClient from "../../client/ApiClient";

const AddDoc = () => {
  const navigate = useNavigate();
  const [response, setRequestResponse] = useState({
    message: "",
    alertClassName: "",
  });

  const initialValues = {
    doctorName: "",
  };

  const validationSchema = Yup.object({
    doctorName: Yup.string().required("Doctor name is required"),
  });

  const onSubmit = (values) => {
    ApiClient.post("/doctor", values)
      .then(() => {
        setRequestResponse({
          message: "Doctor added successfully, redirecting...",
          alertClassName: "alertSuccess",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(() => {
        setRequestResponse({
          message: "Failed to add doctor",
          alertClassName: "alertError",
        });
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Add Doctor</h2>
        <hr />
        <p className={styles.mandatoryText}>All fields are mandatory</p>

        {response.message && (
          <div className={styles[response.alertClassName]}>
            {response.message}
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <div>
                <label>Doctor Name</label>
                <Field type="text" name="doctorName" />
                <ErrorMessage name="doctorName" component="div" />
              </div>

              <button
                className={styles.updateBtn}
                type="submit"
                disabled={!formik.isValid}
              >
                Add Doctor
              </button>
              <button
                className={styles.cancelBtn}
                type="button"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddDoc;
