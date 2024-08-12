import { Link } from "react-router-dom";

const Header = () => {
  return (
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

      <Link to="/contact" style={styles.contact}>
        Contact Form
      </Link>
      {/* <Link to="/login" style={styles.link}>
        Login
      </Link>
      <Link to="/register" style={styles.link}>
        Register
      </Link> */}
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    //backgroundColor: "#282c34",
    color: "white",
  },
  logo: {
    fontSize: "16px",
    fontWeight: "bold",
    border: "1px solid white",
    borderRadius: "21px",
    padding: "8px 12px",
    opacity: "0px",
  },
  nav: {
    display: "flex",
    gap: "48px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
  },
  contact: {
    fontSize: "16px",
    border: "1px solid white",
    borderRadius: "21px",
    padding: "8px 12px",
    opacity: "0px",
    color: "white",
  },
};

export default Header;
