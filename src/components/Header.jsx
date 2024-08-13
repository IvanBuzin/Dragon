import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header style={styles.header}>
        <div style={styles.logo}>LOGO</div>
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/about" style={styles.link}>
            About
          </Link>
          <Link to="/qa" style={styles.link}>
            QA
          </Link>
          <Link to="/contact" style={styles.link}>
            Contact Form
          </Link>
        </nav>

        <div style={styles.contact}>Contact Form</div>

        {/* <Link to="/login" style={styles.link}>
        Login
      </Link>
      <Link to="/register" style={styles.link}>
        Register
      </Link> */}
      </header>
      <h1>dive deep in to the future</h1>
    </div>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "32px",
    color: "white",
  },
  logo: {
    fontSize: "16px",
    border: "1px solid white",
    borderRadius: "21px",
    padding: "8px 12px",
    opacity: "0px",
  },
  nav: {
    display: "flex",
    gap: "48px",
    alignItems: "center",
    width: "382px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  contact: {
    fontSize: "16px",
    border: "1px solid white",
    borderRadius: "21px",
    padding: "8px 12px",
    opacity: "0px",
  },
};

export default Header;
