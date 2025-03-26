import styles from "./styles.module.css";

const ViewDocSpecList = ({ data, onDelete }) => {
  const { id, specializationDate } = data;
  const { doctorId, specializationCode } = id;

  return (
    <tr>
      <td>{doctorId}</td>
      <td>{specializationCode}</td>
      <td>{specializationDate}</td>
      <td>
        <button
          className={`${styles.deleteButton} btn btn-danger btn-sm`}
          onClick={() => onDelete(doctorId)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ViewDocSpecList;
