import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OurRocket = ({
  onRocketSelect = () => {},
  clearSelectedRocket = () => {},
}) => {
  const [rockets, setRockets] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [loading, setLoading] = useState(true); // Індикатор завантаження
  const [error, setError] = useState(null); // Стан для помилки
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedRocket, setSelectedRocket] = useState(null);

  const fetchRockets = async () => {
    try {
      const dragonResponse = await fetch(
        "https://api.spacexdata.com/v4/dragons"
      );
      const dragonData = await dragonResponse.json();

      const rocketResponse = await fetch(
        "https://api.spacexdata.com/v4/rockets"
      );
      const rocketData = await rocketResponse.json();

      const combinedData = [...dragonData, ...rocketData];
      setRockets(combinedData);

      setFilteredImages(
        combinedData.flatMap((rocket) => rocket.flickr_images || [])
      );
    } catch (error) {
      console.error("Error fetching rockets data:", error);
      setError("Failed to load rocket data. Please try again later."); // Повідомлення про помилку
    } finally {
      setLoading(false); // Завершення завантаження
    }
  };

  useEffect(() => {
    fetchRockets();
    // Очищуємо стан вибраної ракети після повернення з RocketInfo
    clearSelectedRocket();
    // Функція очищення для демонтованого компонента
    return () => {
      // Очищаємо стан вибраної ракети
      setSelectedRocket(null);

      // Додаємо інші дії для очищення, якщо потрібно
    };
  }, []);

  const settings = {
    dots: false,
    infinite: false, // вимикаємо нескінченну прокрутку
    speed: 400,
    slidesToShow: window.innerWidth < 768 ? 1 : 3, // Для адаптивності
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const handlePrev = () => {
    if (activeSlide > 0) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (activeSlide < rockets.length - settings.slidesToShow) {
      sliderRef.current.slickNext();
    }
  };

  const metersToFeet = (meters) => (meters * 3.28084).toFixed(1);
  const kgToLbs = (kg) => (kg * 2.20462).toFixed(3);

  const handleRocketClick = (rocket) => {
    if (rocket && rocket.id) {
      setSelectedRocket(rocket); // Зберігаємо вибрану ракету
      onRocketSelect(rocket.id);
      setFilteredImages(rocket.flickr_images || []);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", color: "white" }}>
        <p>Loading rockets...</p> {/* Індикатор завантаження */}
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        <p>{error}</p> {/* Повідомлення про помилку */}
      </div>
    );
  }

  return (
    <div
      className="our-rocket-container"
      style={{ display: "flex", gap: "32px", flexDirection: "column" }}
    >
      <h2 style={{ textAlign: "center" }}>Our rockets</h2>
      <Slider {...settings} ref={sliderRef}>
        {rockets.map((rocket) => (
          <div
            key={rocket.id}
            className="rocket-card"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.2)",
              padding: "24px",
              width: "427px",
              height: "553px",
              boxSizing: "border-box",
              color: "white",
              borderRadius: "40px",
              cursor: "pointer",
            }}
            onClick={() => handleRocketClick(rocket)}
          >
            <div
              className="rocket-card-inner"
              style={{
                display: "flex",
                gap: "24px",
                flexDirection: "column",
                padding: "24px",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "40px",
                width: "375px",
                height: "501px",
              }}
            >
              <img
                className="rocket-image"
                src={
                  rocket.flickr_images?.[0] ||
                  "./images/toy-rocket.gif" /*"./images/placeholder-rocket.png"*/
                }
                alt={rocket.name || "Rocket"}
                style={{
                  width: "378px",
                  borderRadius: "20px",
                  maxHeight: "218px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              />
              <h4
                className="rocket-name"
                style={{ margin: "0px", cursor: "pointer" }}
              >
                {rocket.name || "Rocket"}
              </h4>
              <div
                className="rocket-specs"
                style={{
                  textAlign: "left",
                  display: "flex",
                  gap: "12px",
                  width: "379px",
                  flexDirection: "column",
                }}
              >
                <p className="spec-item" style={styles.info}>
                  <strong>HEIGHT</strong>{" "}
                  {rocket.height?.meters ??
                    rocket.height_w_trunk?.meters ??
                    "8.1"}{" "}
                  m /{" "}
                  {metersToFeet(
                    rocket.height?.meters ?? rocket.height_w_trunk?.meters
                  ) ?? "26.7"}{" "}
                  ft
                </p>
                <p className="spec-item" style={styles.info}>
                  <strong>DIAMETER</strong> {rocket.diameter?.meters ?? "4"} m /{" "}
                  {metersToFeet(rocket.diameter?.meters) ?? "13"} ft
                </p>
                <p style={styles.info}>
                  <strong>SPACECRAFT VOLUME</strong>{" "}
                  {rocket.pressurized_capsule?.payload_volume?.cubic_meters ??
                    "9.3"}{" "}
                  m³ /{" "}
                  {metersToFeet(
                    rocket.pressurized_capsule?.payload_volume?.cubic_meters
                  ) ?? "328"}{" "}
                  ft³
                </p>
                <p className="spec-item" style={styles.info}>
                  <strong>TRUNK VOLUME</strong>{" "}
                  {rocket.trunk?.trunk_volume?.cubic_meters ?? "37"} m³ /{" "}
                  {metersToFeet(rocket.trunk?.trunk_volume?.cubic_meters) ??
                    "1300"}{" "}
                  ft³
                </p>
                <p className="spec-item" style={styles.info}>
                  <strong>LAUNCH PAYLOAD MASS</strong>{" "}
                  {rocket.launch_payload_mass?.kg ??
                    rocket.dry_mass_kg ??
                    "6,000"}{" "}
                  kg /{" "}
                  {kgToLbs(
                    rocket.launch_payload_mass?.kg ?? rocket.dry_mass_kg
                  ) ?? "13,228"}{" "}
                  lbs
                </p>
                <p className="spec-item" style={styles.info}>
                  <strong>RETURN PAYLOAD MASS</strong>{" "}
                  {rocket.return_payload_mass?.kg ?? "3,000"} kg /{" "}
                  {kgToLbs(rocket.return_payload_mass?.kg) ?? "6,614"} lbs
                </p>
                {/* <p
                  className="spec-item"
                  style={styles.info}
                >
                  <strong>DESCRIPTION</strong>{" "}
                  {rocket.description ?? "No description available"}
                </p> */}
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="navigation-container">
        <div
          className={activeSlide === 0 ? "disabled" : ""}
          onClick={handlePrev}
          style={{
            padding: "0px 16px",
            cursor: activeSlide === 0 ? "not-allowed" : "pointer",
          }}
        >
          <img
            className="arrow"
            src="./src/images/Vector w.png"
            alt="navigation left"
            style={{ color: "white", padding: "0px 16px", cursor: "pointer" }}
          />
        </div>
        <div className="dots-container">
          {rockets
            .slice(0, Math.ceil(rockets.length / settings.slidesToShow))
            .map((_, index) => (
              <div
                key={index}
                className={`dot ${index === activeSlide ? "active" : ""}`}
                onClick={() => sliderRef.current.slickGoTo(index)}
                style={{
                  backgroundColor: index === activeSlide ? "white" : "gray",
                  borderRadius: "50%",
                  width: "12px",
                  height: "12px",
                  margin: "0 5px",
                  cursor: "pointer",
                }}
              ></div>
            ))}
        </div>
        <div
          className={
            activeSlide >= rockets.length - settings.slidesToShow
              ? "disabled"
              : ""
          }
          onClick={handleNext}
          style={{
            padding: "0px 16px",
            cursor:
              activeSlide >= rockets.length - settings.slidesToShow
                ? "not-allowed"
                : "pointer",
          }}
        >
          <img
            className="arrow"
            src="./src/images/Vector w r.png"
            alt="navigation right"
            style={{ color: "white", padding: "0px 16px", cursor: "pointer" }}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  info: {
    display: "flex",
    justifyContent: "space-between",
    height: "24px",
    gap: "0px",
    margin: "0px",
  },
};

export default OurRocket;
// import React from "react";

// const OurRocket = ({ onSelectRocket }) => {
//   const rockets = [
//     { id: "starship", name: "Starship" },
//     { id: "falcon9", name: "Falcon 9" },
//     { id: "dragon", name: "Dragon" },
//   ];

//   return (
//     <div>
//       <h2>Select a Rocket</h2>
//       <div>
//         {rockets.map((rocket) => (
//           <button key={rocket.id} onClick={() => onSelectRocket(rocket)}>
//             {rocket.name}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OurRocket;
