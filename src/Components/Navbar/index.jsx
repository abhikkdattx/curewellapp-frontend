import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onLogoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav
      className={`${styles.navbarCustom} ${
        isScrolled ? styles.scrolled : ""
      } navbar navbar-expand-lg`}
    >
      <div className="container-fluid">
        <Link className={styles.brand} to="/">
          CureWell
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className={`${styles.navLinks} navbar-nav gap-4`}>
            <li className="nav-item">
              <Link className={`${styles.navLink} nav-link`} to="/">
                View Doctors
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`${styles.navLink} nav-link`}
                to="/specialization"
              >
                View Specializations
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.navLink} nav-link`} to="/view-surgery">
                View Surgery
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.navLink} nav-link`} to="/add">
                Add Doctor
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.loginLogoutContainer}>
          {!isLoggedIn ? (
            <Link className={`${styles.loginBtn} btn`} to="/login">
              Login
            </Link>
          ) : (
            <button
              className={`${styles.logoutBtn} btn`}
              onClick={onLogoutHandler}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
