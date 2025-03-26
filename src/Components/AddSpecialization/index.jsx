import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../client/ApiClient";

const AddSpecialization = () => {
  const navigate = useNavigate();
  const [requestResponse, setRequestResponse] = useState({
    message: "",
    alertClassName: "",
  });

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    ApiClient.get("/doctor")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => console.log("Error fetching doctors:", error));
  }, []);

  const initialValues = {
    doctorId: "",
    specializationCode: "",
    specializationName: "",
  };

  const checkIfSpecializationExists = async (doctorId, specializationCode) => {
    try {
      const response = await ApiClient.get(
        `/doctorSpecialization/check/${doctorId}/${specializationCode}`
      );
      return response.data.exists;
    } catch (error) {
      console.log("Error checking if specialization exists:", error);
      return false;
    }
  };

  const onSubmit = async (values) => {
    const { doctorId, specializationCode, specializationName } = values;

    const mappingExists = await checkIfSpecializationExists(
      doctorId,
      specializationCode
    );

    if (mappingExists) {
      setRequestResponse({
        message: "This doctor is already assigned to this specialization.",
        alertClassName: "alertError",
      });
      return;
    }

    try {
      let existingSpecialization;
      try {
        existingSpecialization = await ApiClient.get(
          `/specialization/${specializationCode}`
        );
      } catch (error) {
        existingSpecialization = null;
      }

      if (!existingSpecialization?.data) {
        await ApiClient.post("/specialization", {
          specializationCode,
          specializationName,
        });
      }

      const specializationDate = new Date().toISOString().split("T")[0];
      await ApiClient.post("/doctorSpecialization", {
        doctorId,
        specializationCode,
        specializationDate,
      });

      setRequestResponse({
        message: "Specialization added successfully, redirecting...",
        alertClassName: "alertSuccess",
      });

      setTimeout(() => {
        navigate("/specialization");
      }, 2000);
    } catch (error) {
      console.log("Error in submission:", error);
      setRequestResponse({
        message: "Failed to add specialization. Please try again.",
        alertClassName: "alertError",
      });
    }
  };

  const validationSchema = Yup.object({
    doctorId: Yup.string().required("Doctor ID is required"),
    specializationCode: Yup.string()
      .required("Specialization code is required")
      .min(3, "Specialization code must be at least 3 characters long"),
    specializationName: Yup.string().required(
      "Specialization name is required"
    ),
  });

  return (
    <div className={styles.formContainer}>
      <div className={styles.wrapper}>
        {requestResponse.message && (
          <div className={requestResponse.alertClassName}>
            {requestResponse.message}
          </div>
        )}
        <h2 className="text-center">Add a New Specialization</h2>
        <hr />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form>
              <div>
                <label>Doctor ID</label>
                <Field
                  as="select"
                  name="doctorId"
                  className={
                    formik.errors.doctorId && formik.touched.doctorId
                      ? `${styles.inputError}`
                      : `${styles.input}`
                  }
                >
                  <option value="">Select Doctor</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.doctorId} value={doctor.doctorId}>
                      {doctor.doctorId}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="doctorId"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div>
                <label>Specialization Code</label>
                <Field
                  type="text"
                  name="specializationCode"
                  placeholder="Enter specialization code"
                  className={
                    formik.errors.specializationCode &&
                    formik.touched.specializationCode
                      ? `${styles.inputError}`
                      : `${styles.input}`
                  }
                />
                <ErrorMessage
                  name="specializationCode"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div>
                <label>Specialization Name</label>
                <Field
                  type="text"
                  name="specializationName"
                  placeholder="Enter specialization name"
                  className={
                    formik.errors.specializationName &&
                    formik.touched.specializationName
                      ? `${styles.inputError}`
                      : `${styles.input}`
                  }
                />
                <ErrorMessage
                  name="specializationName"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div className={styles.btnContainer}>
                <button
                  type="submit"
                  disabled={!formik.isValid}
                  className={styles.btnWhite}
                >
                  Add Specialization
                </button>
                <Link to="/specialization" className={styles.btnGrey}>
                  Cancel
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSpecialization;
