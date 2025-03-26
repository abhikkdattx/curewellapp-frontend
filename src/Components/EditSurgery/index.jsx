import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./styles.module.css";
import ApiClient from "../../client/ApiClient";

const EditSurgery = () => {
  const navigate = useNavigate();
  const { surgeryId } = useParams();
  const [initialValues, setInitialValues] = useState({
    surgeryId: surgeryId,
    doctorId: "",
    surgeryDate: "",
    startTime: "",
    endTime: "",
    specializationCode: "",
  });

  const [response, setResponse] = useState({
    message: "",
    alertClassName: "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    ApiClient.get(`/surgery/${surgeryId}`)
      .then((response) => {
        setInitialValues({
          surgeryId: response.data.surgeryId,
          doctorId: response.data.doctorId,
          surgeryDate: response.data.surgeryDate,
          startTime: response.data.startTime,
          endTime: response.data.endTime,
          specializationCode: response.data.specializationCode,
        });
      })
      .catch(() => {
        setResponse({
          message: "Failed to fetch surgery details",
          alertClassName: styles.alertError,
        });
      });
  }, [surgeryId]);

  const validationSchema = Yup.object({
    startTime: Yup.string().required("Start Time is required"),
    endTime: Yup.string().required("End Time is required"),
  });

  const onSubmit = (values) => {
    ApiClient.put(`/surgery/${surgeryId}`, values)
      .then(() => {
        setResponse({
          message: "Surgery updated successfully, redirecting...",
          alertClassName: styles.alertSuccess,
        });
        setTimeout(() => navigate("/view-surgery"), 2000);
      })
      .catch(() => {
        setResponse({
          message: "Failed to update surgery",
          alertClassName: styles.alertError,
        });
      });
  };

  const deleteSurgery = () => {
    ApiClient.delete(`/surgery/${surgeryId}`)
      .then(() => {
        setResponse({
          message: "Surgery deleted successfully, redirecting...",
          alertClassName: styles.alertSuccess,
        });
        setTimeout(() => navigate("/view-surgery"), 2000);
      })
      .catch(() => {
        setResponse({
          message: "Failed to delete surgery",
          alertClassName: styles.alertError,
        });
      });
    setShowDeleteModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className="text-center">Edit Surgery Details</h2>
        <hr />

        {response.message && (
          <div className={`${response.alertClassName}`}>{response.message}</div>
        )}

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isValid }) => (
            <Form className={styles.form}>
              <div>
                <label>Surgery ID</label>
                <Field type="text" name="surgeryId" disabled />
              </div>

              <div>
                <label>Doctor ID</label>
                <Field type="text" name="doctorId" disabled />
              </div>

              <div>
                <label>Surgery Date</label>
                <Field type="date" name="surgeryDate" disabled />
              </div>

              <div>
                <label>Start Time</label>
                <Field type="time" name="startTime" />
                <ErrorMessage
                  name="startTime"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div>
                <label>End Time</label>
                <Field type="time" name="endTime" />
                <ErrorMessage
                  name="endTime"
                  component="div"
                  className={styles.error}
                />
              </div>

              <div>
                <label>Surgery Category</label>
                <Field type="text" name="specializationCode" disabled />
              </div>

              <div className={styles.buttonGroup}>
                <button
                  className={styles.whiteButton}
                  type="submit"
                  disabled={!isValid}
                >
                  Update Surgery
                </button>
                <button
                  className={styles.redButton}
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete Surgery
                </button>
                <button
                  className={styles.cancelButton}
                  type="button"
                  onClick={() => navigate("/view-surgery")}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this surgery?</p>
            <div className={styles.modalButtons}>
              <button className={styles.redButton} onClick={deleteSurgery}>
                Yes, Delete
              </button>
              <button
                className={styles.whiteButton}
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSurgery;
