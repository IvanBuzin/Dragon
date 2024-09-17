import { Link } from "react-router-dom";

const Header = ({ onHomeClick }) => {
  return (
    <div style={{ scrollBehavior: "smooth" }}>
      <header style={styles.header}>
        <div style={styles.logo}>LOGO</div>
        <nav style={styles.nav}>
          <Link onClick={onHomeClick} to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/about" style={styles.link}>
            About
          </Link>
          <Link to="/qa" style={styles.link}>
            QA
          </Link>
          <Link to="/contact" style={styles.contactN}>
            Contact Form
          </Link>
        </nav>

        <div style={styles.contact}>Contact Form</div>

        <Link to="/login" style={styles.link}>
          Login
        </Link>
        <Link to="/register" style={styles.link}>
          Register
        </Link>
      </header>
      <h1
        style={{
          display: "flex",
          width: "583px",
          height: "357px",
          marginTop: "48px",
          marginLeft: "32px",
          gap: "0px",
          // opacity: 0,
        }}
      >
        dive deep in to the future
      </h1>
      <div
        style={{
          display: "flex",
          height: "6px",
          width: "1191px",
          background:
            "linear-gradient(359deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)",
          margin: "94px 42px 48px 94px",
        }}
      >
        <img
          src="/src/images/Group d.png"
          alt="kolo"
          style={{
            width: "33px",
            height: "33px",
            margin: " -14px 0 0 -64px",

            opacity: "0.8",
          }}
        />
      </div>
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
    justifyContent: "space-between",
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
  contactN: {
    fontSize: "16px",
    textDecoration: "none",
  },
};

export default Header;
