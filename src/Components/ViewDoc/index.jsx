import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Doctor from "./ViewDocList";
import styles from "./styles.module.css";
import ApiClient from "../../client/ApiClient";

const ViewDoc = () => {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    ApiClient.get("/doctor")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className={styles.viewDoctorsContainer}>
      <div className={styles.wrapper}>
        <h2>View Doctors</h2>
        <button className={styles.btnPrimary} onClick={() => navigate("/add")}>
          Add New Doctor
        </button>

        {doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Doctor Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, index) => (
                <Doctor key={index} data={doctor} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewDoc;
