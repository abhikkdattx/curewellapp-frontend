import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiClient from "../../client/ApiClient";
import styles from "./styles.module.css";
import SpecializationList from "./SpecializationList";

const ViewSpecialization = () => {
  const [specializations, setSpecializations] = useState([]);
  const navigate = useNavigate();

  const getSpecializations = () => {
    ApiClient.get("/specialization")
      .then((response) => {
        setSpecializations(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getSpecializations();
  }, []);

  const handleAddSpecializationClick = () => {
    navigate("/add-specialization");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2>View Specializations</h2>
        <button
          className={styles.btnWhite}
          onClick={handleAddSpecializationClick}
        >
          Add New Specialization
        </button>

        {specializations.length === 0 ? (
          <p className={styles.textCenter}>No specializations available.</p>
        ) : (
          <table className={styles.table}>
            <thead className={styles.theadDark}>
              <tr>
                <th>Specialization Code</th>
                <th>Specialization Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {specializations.map((specialization, index) => (
                <SpecializationList key={index} data={specialization} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ViewSpecialization;
