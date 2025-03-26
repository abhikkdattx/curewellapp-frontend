import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import ApiClient from "../../client/ApiClient";

const UpdateDoctor = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();

  const [initialValues, setInitialValues] = useState({
    doctorId: doctorId,
    doctorName: "",
  });

  const [response, setRequestResponse] = useState({
    message: "",
    alertClassName: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    ApiClient.get(`/doctor/${doctorId}`)
      .then((response) => {
        setInitialValues({
          doctorId: response.data.doctorId,
          doctorName: response.data.doctorName,
        });
      })
      .catch(() => {
        setRequestResponse({
          message: "Failed to fetch doctor details",
          alertClassName: "alertError",
        });
      });
  }, [doctorId]);

  const validationSchema = Yup.object({
    doctorName: Yup.string().required("Doctor name is required"),
  });

  const onSubmit = (values) => {
    ApiClient.put(`doctor/${doctorId}`, values)
      .then(() => {
        setRequestResponse({
          message: "Doctor details updated successfully, redirecting...",
          alertClassName: "alertSuccess",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(() => {
        setRequestResponse({
          message: "Failed to update doctor details",
          alertClassName: "alertError",
        });
      });
  };

  const deleteDoctor = () => {
    ApiClient.delete(`doctor/${doctorId}`)
      .then(() => {
        setRequestResponse({
          message: "Doctor deleted successfully, redirecting...",
          alertClassName: "alertSuccess",
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(() => {
        setRequestResponse({
          message: "Failed to delete doctor",
          alertClassName: "alertError",
        });
      });

    setShowDeleteModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>Update Doctor</h2>
        <hr />
        <p className={styles.mandatoryText}>All fields are mandatory</p>

        {response.message && (
          <div className={styles[response.alertClassName]}>
            {response.message}
          </div>
        )}

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              <div>
                <label>Doctor ID</label>
                <Field
                  type="text"
                  name="doctorId"
                  value={initialValues.doctorId}
                  disabled
                  className={styles.disabledInput}
                />
              </div>

              <div>
                <label>Doctor Name</label>
                <Field type="text" name="doctorName" />
                <ErrorMessage name="doctorName" component="div" />
              </div>

              <button
                className={`${styles.updateBtn}`}
                type="submit"
                disabled={!formik.isValid}
              >
                Update Doctor
              </button>
              <button
                className={`${styles.deleteBtn}`}
                type="button"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Doctor
              </button>
              <button
                className={`${styles.cancelBtn}`}
                type="button"
                onClick={() => navigate("/")}
              >
                Cancel
              </button>
            </Form>
          )}
        </Formik>
      </div>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this doctor?</p>
            <button className={`${styles.deleteBtn}`} onClick={deleteDoctor}>
              Yes, Delete
            </button>
            <button
              className={`${styles.cancelBtn}`}
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateDoctor;
