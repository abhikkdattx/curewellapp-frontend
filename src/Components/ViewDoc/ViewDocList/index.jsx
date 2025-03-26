import { Link } from "react-router-dom";

const Doctor = (props) => {
    const {doctorId, doctorName} = props.data;

    return(
        <tr>
            <td>{doctorId}</td>
            <td>{doctorName}</td>
            <td>
                <Link to={`/update/${doctorId}`} className="btn btn-dark btn-sm">Edit Doctor Details</Link>
            </td>
        </tr>
    );
};

export default Doctor;