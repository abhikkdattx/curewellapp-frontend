import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const SpecializationList = (props) => {
  const { specializationCode, specializationName } = props.data;

  return (
    <tr>
      <td>{specializationCode}</td>
      <td>{specializationName}</td>
      <td>
        <Link
          to={`/view-specialization/${specializationCode}`}
          className={styles.btnGrey}
        >
          View Doctors
        </Link>
      </td>
    </tr>
  );
};

export default SpecializationList;
