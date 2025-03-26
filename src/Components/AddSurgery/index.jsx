import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import ApiClient from "../../client/ApiClient";

const AddSurgery = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);
  const [requestResponse, setRequestResponse] = useState({
    message: "",
    alertClass: "",
  });

  useEffect(() => {
    ApiClient.get("/doctor")
      .then((response) => setDoctors(response.data))
      .catch((error) => console.log("Error fetching doctors:", error));
  }, []);

  const initialValues = {
    doctorId: "",
    specializationCode: "",
    surgeryDate: "",
    startTime: "",
    endTime: "",
  };

  const ValidationSchema = Yup.object({
    doctorId: Yup.string().required("Doctor ID is required"),
    specializationCode: Yup.string().required("Surgery Category is required"),
    surgeryDate: Yup.string().required("Surgery Date is required"),
    startTime: Yup.string().required("Start Time is required"),
    endTime: Yup.string().required("End Time is required"),
  });

  const handleDoctorChange = (doctorId, setFieldValue) => {
    if (!doctorId) {
      setFilteredSpecializations([]);
      setFieldValue("specializationCode", "");
      return;
    }

    ApiClient.get(`/doctorSpecialization/doctor/${doctorId}`)
      .then((response) => {
        setFilteredSpecializations(response.data);
        setFieldValue("specializationCode", "");
      })
      .catch((error) => console.log("Error fetching specializations:", error));
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    ApiClient.post("/surgery", values)
      .then(() => {
        setRequestResponse({
          message: "Surgery added successfully. Redirecting...",
          alertClassName: "alert-success",
        });

        setTimeout(() => navigate("/view-surgery"), 2000);
        resetForm();
      })
      .catch(() => {
        setRequestResponse({
          message: "Failed to add surgery",
          alertClassName: "alert-danger",
        });
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className={styles.wrapper}>
      <h2>Add New Surgery</h2>

      {requestResponse.message && (
        <div
          className={`${styles.alert} ${
            styles[requestResponse.alertClassName]
          }`}
        >
          {requestResponse.message}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="doctorId">Doctor ID</label>
              <Field
                as="select"
                name="doctorId"
                className="form-control"
                onChange={(e) => {
                  setFieldValue("doctorId", e.target.value);
                  handleDoctorChange(e.target.value, setFieldValue);
                }}
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
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="specializationCode">Surgery Category</label>
              <Field
                as="select"
                name="specializationCode"
                className="form-control"
              >
                <option value="">Select Surgery Category</option>
                {filteredSpecializations.length > 0 ? (
                  filteredSpecializations.map((spec) => (
                    <option
                      key={spec.id.specializationCode}
                      value={spec.id.specializationCode}
                    >
                      {spec.id.specializationCode}
                    </option>
                  ))
                ) : (
                  <option disabled>No specializations found</option>
                )}
              </Field>
              <ErrorMessage
                name="specializationCode"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="surgeryDate">Surgery Date</label>
              <Field type="date" name="surgeryDate" className="form-control" />
              <ErrorMessage
                name="surgeryDate"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="startTime">Start Time</label>
              <Field type="time" name="startTime" className="form-control" />
              <ErrorMessage
                name="startTime"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="endTime">End Time</label>
              <Field type="time" name="endTime" className="form-control" />
              <ErrorMessage
                name="endTime"
                component="div"
                className="text-danger"
              />
            </div>

            <div className={styles.buttonContainer}>
              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Surgery"}
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => navigate("/view-surgery")}
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddSurgery;
