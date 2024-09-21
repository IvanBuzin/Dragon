import { Link } from "react-router-dom";
import css from "./Header.module.css";

const Header = ({ onHomeClick, onContactFormClick }) => {
  return (
    <div className={css.heroContent}>
      <header className={css.header}>
        <div className={css.logo}>LOGO</div>
        <nav className={css.nav}>
          <Link onClick={onHomeClick} to="/" className={css.link}>
            Home
          </Link>
          <Link to="/about" className={css.link}>
            About
          </Link>
          <Link to="/qa" className={css.link}>
            QA
          </Link>
          <Link to="/contact" className={css.contact}>
            Contact Form
          </Link>
        </nav>

        <div className={css.authLinks}>
          <Link
            onClick={() => onContactFormClick("login")}
            to="/login"
            className={css.link}
          >
            Contact
          </Link>
          <Link
            onClick={() => onContactFormClick("register")}
            to="/register"
            className={css.link}
          >
            &nbsp;Form
          </Link>
        </div>
      </header>
      <h1 className={css.title}>dive deep in to the future</h1>
      <div className={css.gradientLine}>
        <img src="/images/Group d.png" alt="kolo" className={css.koloImage} />
      </div>
    </div>
  );
};

export default Header;
