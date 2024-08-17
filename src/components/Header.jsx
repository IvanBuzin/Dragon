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
      <div style={styles.vector}></div>
      <img
        src="https://oblador.github.io/react-native-vector-icons/#Ionicons"
        alt="globus"
        // loading={"lazy"}
        style={{
          position: "absolute",
          left: "2.42%",
          right: "95.08%",
          top: "90.05%",
          bottom: "4.9%",
          width: "33.02px",
          height: "33px",
          // top: "588px",
          // left: "32.02px",
          gap: "0px",
          opacity: "0px",
        }}
      />
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
  vector: {
    position: "absolute",
    width: "6px",
    height: "1191px",
    left: "1288px",
    top: "602px",
    background:
      "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)",
    transform: "rotate(90deg)",
  },
};

export default Header;
