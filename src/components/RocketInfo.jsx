import { Link } from "react-router-dom";

const RocketInfo = ({ rocket, onContactFormClick }) => {
  if (!rocket) {
    return <p>Select a rocket to see the details.</p>;
  }

  const metersToFeet = (meters) => (meters * 3.28084).toFixed(1);
  const kgToLbs = (kg) => (kg * 2.20462).toFixed(3);

  return (
    <div
      className="rocketInfo"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      <header style={styles.header}>
        <div style={styles.logo}>LOGO</div>
        <nav style={styles.nav}>
          <Link onClick to="/" style={styles.link}>
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
        </div>{" "}
      </header>
      <h2>{rocket.name}</h2>
      <div
        style={{
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "24px",
          // width: "427px",
          height: "505px",
          boxSizing: "border-box",
          color: "white",
          borderRadius: "40px",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            flexDirection: "row",
            borderRadius: "20px",
            height: "453px",
            display: "flex",
            gap: "20px",
          }}
        >
          <img
            src={rocket.flickr_images?.[0] || "/images/falcon.jpg"}
            srcSet={`${rocket.flickr_images[0]} 480w,
                           ${rocket.flickr_images[1]} 800w,
                           ${rocket.flickr_images[1]} 1200w`}
            sizes="(max-width: 600px) 480px,
                         (max-width: 960px) 800px,
                         1200px"
            alt={rocket.name || "Rocket"}
            loading="lazy" // Оптимізація завантаження зображень
            style={{
              maxWidth: "791px",
              width: "100%",
              // height: "453px",
              maxHeight: "457px",
              borderRadius: "20px",
            }}
          />
          <div
            style={{
              justifyContent: "space-between",
              display: "flex",
              width: "458px",
              height: "395px",
              gap: "32px",
              flexDirection: "column",
            }}
          >
            <h4 style={{ fontWeight: "700", margin: "0px" }}>{rocket.name}</h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                margin: "0px",
                height: "395px",
              }}
            >
              <p style={styles.info}>
                <strong>Height</strong> {rocket.height_w_trunk?.meters ?? "8.1"}{" "}
                m / {metersToFeet(rocket.height_w_trunk?.meters) ?? "26.7"} ft
              </p>
              <p style={styles.info}>
                <strong>Diameter</strong> {rocket.diameter?.meters ?? "4"} m /{" "}
                {metersToFeet(rocket.diameter?.meters) ?? "13"} ft
              </p>
              <p style={styles.info}>
                <strong>Spacecraft Volume</strong>{" "}
                {rocket.pressurized_capsule?.payload_volume?.cubic_meters ??
                  "9.3"}{" "}
                m³ /{" "}
                {metersToFeet(
                  rocket.pressurized_capsule?.payload_volume?.cubic_meters
                ) ?? "328"}{" "}
                ft³
              </p>
              <p style={styles.info}>
                <strong>Trunk Volume</strong>{" "}
                {rocket.trunk?.trunk_volume?.cubic_meters ?? "37"} m³/
                {metersToFeet(rocket.trunk?.trunk_volume?.cubic_meters) ??
                  "1300"}{" "}
                ft³
              </p>
              <p style={styles.info}>
                <strong>Launch Payload Mass</strong>{" "}
                {rocket.launch_payload_mass?.kg ?? "6,000"} kg /{" "}
                {kgToLbs(rocket.launch_payload_mass?.kg) ?? "13,228"} lbs{" "}
              </p>
              <p style={styles.info}>
                <strong>Trunk Volume</strong>{" "}
                {rocket.trunk?.trunk_volume?.cubic_meters ?? "37"} m³/
                {metersToFeet(rocket.trunk?.trunk_volume?.cubic_meters) ??
                  "1300"}{" "}
                ft³
              </p>
              <p style={styles.info}>
                <strong>Launch Payload Mass</strong>{" "}
                {rocket.launch_payload_mass?.kg ?? "6,000"} kg /{" "}
                {kgToLbs(rocket.launch_payload_mass?.kg) ?? "13,228"} lbs{" "}
              </p>
              <p style={styles.info}>
                <strong>Return Payload Mass</strong>{" "}
                {rocket.return_payload_mass?.kg ?? "3,000"} kg /{" "}
                {kgToLbs(rocket.return_payload_mass?.kg) ?? "6,614"} lbs{" "}
              </p>
              <p style={styles.info}>
                <strong>Return Payload Mass</strong>{" "}
                {rocket.return_payload_mass?.kg ?? "3,000"} kg /{" "}
                {kgToLbs(rocket.return_payload_mass?.kg) ?? "6,614"} lbs{" "}
              </p>
              <p style={styles.info}>
                <strong>Spacecraft Volume</strong>{" "}
                {rocket.pressurized_capsule?.payload_volume?.cubic_meters ??
                  "9.3"}{" "}
                m³/
                {metersToFeet(
                  rocket.pressurized_capsule?.payload_volume?.cubic_meters
                ) ?? "328"}{" "}
                ft³
              </p>
              <p style={styles.info}>
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
const styles = {
  info: {
    display: "flex",
    justifyContent: "space-between",
    width: "458px",
    height: "25px",
    padding: "0px 0px 8px 0px",
    gap: "0px",
    border: "0px 0px 1px 0px",
    margin: "0px",
    textTransform: "uppercase",
  },
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
    textDecoration: "none",
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
};

export default RocketInfo;
