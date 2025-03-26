import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiClient from "../../client/ApiClient";
import styles from "./styles.module.css";
import ViewDocSpecList from "./ViewDocSpecList";

const ViewDocSpecialization = () => {
  const { specializationCode } = useParams();
  const navigate = useNavigate();
  const [doctorsSpecializations, setDoctorSpecializations] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [response, setResponse] = useState({ message: "", alertClassName: "" });

  useEffect(() => {
    fetchDoctorSpecializations();
  }, [specializationCode]);

  const fetchDoctorSpecializations = () => {
    ApiClient.get(`/doctorSpecialization/specialization/${specializationCode}`)
      .then((response) => setDoctorSpecializations(response.data))
      .catch((error) => console.log(error));
  };

  const confirmDelete = (doctorId) => {
    setSelectedDoctor(doctorId);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedDoctor) return;

    try {
      await ApiClient.delete(
        `/doctorSpecialization/${selectedDoctor}/${specializationCode}`
      );
      setResponse({
        message: "Specialization deleted successfully! Redirecting...",
        alertClassName: "alertSuccess",
      });

      setTimeout(() => {
        navigate("/specialization");
      }, 2000);
    } catch (error) {
      console.log(error);
      setResponse({
        message: "Failed to delete specialization.",
        alertClassName: "alertError",
      });
    }

    setShowDeleteModal(false);
    setSelectedDoctor(null);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Doctors for Specialization: {specializationCode}</h2>
        </div>

        {response.message && (
          <div className={styles[response.alertClassName]}>
            {response.message}
          </div>
        )}

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Specialization Code</th>
                <th>Specialization Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctorsSpecializations.length > 0 ? (
                doctorsSpecializations.map((record, index) => (
                  <ViewDocSpecList
                    key={index}
                    data={record}
                    onDelete={confirmDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No doctors available for this specialization.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showDeleteModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <h3>Confirm Deletion</h3>
              <p>Are you sure you want to delete this specialization?</p>
              <div className={styles.modalButtons}>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Yes, Delete
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className={styles.cancelWrapper}>
          <button
            className="btn btn-light"
            onClick={() => navigate("/specialization")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDocSpecialization;
