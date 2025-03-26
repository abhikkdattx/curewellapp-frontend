import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const SurgeryList = ({ data }) => {
  const {
    surgeryId,
    doctor,
    surgeryCategory,
    surgeryDate,
    startTime,
    endTime,
  } = data;
  const doctorId = doctor?.doctorId;
  const specializationCode = surgeryCategory?.specializationCode;

  return (
    <tr>
      <td>{surgeryId}</td>
      <td>{doctorId}</td>
      <td>{specializationCode}</td>
      <td>{surgeryDate}</td>
      <td>{startTime}</td>
      <td>{endTime}</td>
      <td>
        <Link className={styles.editButton} to={`/edit-surgery/${surgeryId}`}>
          Edit Surgery Time
        </Link>
      </td>
    </tr>
  );
};

export default SurgeryList;
