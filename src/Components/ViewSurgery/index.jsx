import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../client/ApiClient";
import SurgeryList from "./SurgeryList";
import styles from "./styles.module.css";

const ViewSurgery = () => {
  const navigate = useNavigate();
  const [surgeries, setSurgeries] = useState([]);
  const [filteredSurgeries, setFilteredSurgeries] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    ApiClient.get("surgery")
      .then((response) => {
        setSurgeries(response.data);
        setFilteredSurgeries(response.data);
      })
      .catch((error) => console.log("Error fetching surgeries:", error));
  }, []);

  const handleDateChange = (event) => {
    const selected = event.target.value;
    setSelectedDate(selected);

    if (selected === "") {
      setFilteredSurgeries(surgeries);
    } else {
      const filtered = surgeries.filter(
        (surgery) => surgery.surgeryDate === selected
      );
      setFilteredSurgeries(filtered);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.content}>
        <h2 className={styles.header}>View All Surgeries</h2>

        <div className={styles.controls}>
  <input
    type="date"
    className={styles.dateInput}
    value={selectedDate}
    onChange={handleDateChange}
  />
  <button className={styles.addButton} onClick={() => navigate("/add-surgery")}>
    Add Surgery
  </button>
</div>

        {filteredSurgeries.length === 0 ? (
          <p className={styles.noDataText}>No surgeries available.</p>
        ) : (
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Surgery ID</th>
                  <th>Doctor ID</th>
                  <th>Surgery Category</th>
                  <th>Surgery Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSurgeries.map((surgery, index) => (
                  <SurgeryList key={index} data={surgery} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewSurgery;
