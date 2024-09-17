import { Link } from "react-router-dom";

const Header = ({ onHomeClick, onContactFormClick }) => {
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
          <Link to="/contact" style={styles.contact}>
            Contact Form
          </Link>
        </nav>

        <div style={styles.authLinks}>
          <Link
            onClick={() => onContactFormClick("login")}
            to="/login"
            style={styles.link}
          >
            Contact
          </Link>
          <Link
            onClick={() => onContactFormClick("register")}
            to="/register"
            style={styles.link}
          >
            &nbsp;Form
          </Link>
        </div>
      </header>
      <h1 style={styles.title}>dive deep in to the future</h1>
      <div style={styles.gradientLine}>
        <img
          src="/src/images/Group d.png"
          alt="kolo"
          style={styles.koloImage}
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
    wlexWrap: "wrap", // Щоб елементи переносилися на інший рядок на маленьких екранах
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
    flexWrap: "wrap", // Адаптивність навігації
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
  },
  authLinks: {
    display: "flex",

    flexWrap: "wrap",
    fontSize: "16px",
    border: "1px solid white",
    borderRadius: "21px",
    padding: "8px 12px",
    opacity: "0px",
  },
  contact: {
    fontSize: "16px",
    textDecoration: "none",
  },
  title: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: "583px",
    height: "auto",
    marginTop: "48px",
    marginLeft: "32px",
    gap: "0px",
    fontSize: "6.25rem", // Відносні одиниці для масштабування на різних екранах
  },
  gradientLine: {
    display: "flex",
    height: "6px",
    width: "100%",
    maxWidth: "1191px",
    background:
      "linear-gradient(359deg, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 100%)",
    margin: "94px 42px 48px 94px",
  },
  koloImage: {
    width: "33px",
    height: "33px",
    margin: " -14px 0 0 -64px",
    opacity: "0.8",
  },
  // Медіа-запити для адаптивного дизайну
  "@media (max-width: 768px)": {
    nav: {
      flexDirection: "column",
      gap: "16px",
    },
    header: {
      flexDirection: "column",
      gap: "16px",
    },
    title: {
      fontSize: "2rem", // Менший розмір шрифту на середніх екранах
    },
  },
  "@media (max-width: 480px)": {
    title: {
      fontSize: "1.5rem", // Ще менший шрифт на мобільних пристроях
      textAlign: "center", // Центруємо текст
    },
    gradientLine: {
      width: "90%", // Менша ширина на мобільних пристроях
    },
  },
};

export default Header;
