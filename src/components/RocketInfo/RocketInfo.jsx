import { Link } from "react-router-dom";
import css from "./RocketInfo.module.css";

const RocketInfo = ({ rocket, onContactFormClick }) => {
  if (!rocket) {
    return <p>Select a rocket to see the details.</p>;
  }

  const metersToFeet = (meters) => (meters * 3.28084).toFixed(1);
  const kgToLbs = (kg) => (kg * 2.20462).toFixed(3);

  return (
    <div className={css.rocketInfo}>
      <header className={css.header}>
        <div className={css.logo}>LOGO</div>
        <nav className={css.nav}>
          <Link onClick to="/" className={css.link}>
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
        </div>{" "}
      </header>
      <h2 className={css.rocketInfoH2}>{rocket.name}</h2>
      <div className={css.rocketInfoContainer}>
        <div className={css.rocketInfoBlock}>
          <img
            className={css.rocketInfoImg}
            src={rocket.flickr_images?.[0] || "/images/falcon.jpg"}
            srcSet={`${rocket.flickr_images[0]} 480w,
                           ${rocket.flickr_images[1]} 800w,
                           ${rocket.flickr_images[1]} 1200w`}
            sizes="(max-width: 600px) 480px,
                         (max-width: 960px) 800px,
                         1200px"
            alt={rocket.name || "Rocket"}
            loading="lazy" // Оптимізація завантаження зображень
          />
          <div className={css.blockContent}>
            <h4 className={css.rocketInfoH4}>{rocket.name}</h4>
            <div className={css.blockContentText}>
              <p className={css.info}>
                <strong>Height</strong> {rocket.height_w_trunk?.meters ?? "8.1"}{" "}
                m / {metersToFeet(rocket.height_w_trunk?.meters) ?? "26.7"} ft
              </p>
              <p className={css.info}>
                <strong>Diameter</strong> {rocket.diameter?.meters ?? "4"} m /{" "}
                {metersToFeet(rocket.diameter?.meters) ?? "13"} ft
              </p>
              <p className={css.info}>
                <strong>Spacecraft Volume</strong>{" "}
                {rocket.pressurized_capsule?.payload_volume?.cubic_meters ??
                  "9.3"}{" "}
                m³ /{" "}
                {metersToFeet(
                  rocket.pressurized_capsule?.payload_volume?.cubic_meters
                ) ?? "328"}{" "}
                ft³
              </p>
              <p className={css.info}>
                <strong>Trunk Volume</strong>{" "}
                {rocket.trunk?.trunk_volume?.cubic_meters ?? "37"} m³/
                {metersToFeet(rocket.trunk?.trunk_volume?.cubic_meters) ??
                  "1300"}{" "}
                ft³
              </p>
              <p className={css.info}>
                <strong>Launch Payload Mass</strong>{" "}
                {rocket.launch_payload_mass?.kg ?? "6,000"} kg /{" "}
                {kgToLbs(rocket.launch_payload_mass?.kg) ?? "13,228"} lbs{" "}
              </p>
              <p className={css.info}>
                <strong>Trunk Volume</strong>{" "}
                {rocket.trunk?.trunk_volume?.cubic_meters ?? "37"} m³/
                {metersToFeet(rocket.trunk?.trunk_volume?.cubic_meters) ??
                  "1300"}{" "}
                ft³
              </p>
              <p className={css.info}>
                <strong>Launch Payload Mass</strong>{" "}
                {rocket.launch_payload_mass?.kg ?? "6,000"} kg /{" "}
                {kgToLbs(rocket.launch_payload_mass?.kg) ?? "13,228"} lbs{" "}
              </p>
              <p className={css.info}>
                <strong>Return Payload Mass</strong>{" "}
                {rocket.return_payload_mass?.kg ?? "3,000"} kg /{" "}
                {kgToLbs(rocket.return_payload_mass?.kg) ?? "6,614"} lbs{" "}
              </p>
              <p className={css.info}>
                <strong>Return Payload Mass</strong>{" "}
                {rocket.return_payload_mass?.kg ?? "3,000"} kg /{" "}
                {kgToLbs(rocket.return_payload_mass?.kg) ?? "6,614"} lbs{" "}
              </p>
              <p className={css.info}>
                <strong>Spacecraft Volume</strong>{" "}
                {rocket.pressurized_capsule?.payload_volume?.cubic_meters ??
                  "9.3"}{" "}
                m³/
                {metersToFeet(
                  rocket.pressurized_capsule?.payload_volume?.cubic_meters
                ) ?? "328"}{" "}
                ft³
              </p>
              <p className={css.info}>
                <strong>Return Payload Mass</strong>{" "}
                {rocket.return_payload_mass?.kg ?? "3,000"} kg /{" "}
                {kgToLbs(rocket.return_payload_mass?.kg) ?? "6,614"} lbs{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RocketInfo;
