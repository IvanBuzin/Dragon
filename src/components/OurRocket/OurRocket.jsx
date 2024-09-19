import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import css from "./OurRocket.module.css";

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

  const fetchRockets = async () => {
    try {
      const [dragonRes, rocketsRes] = await Promise.all([
        fetch("https://api.spacexdata.com/v4/dragons"),
        fetch("https://api.spacexdata.com/v4/rockets"),
      ]);

      const [dragons, rockets] = await Promise.all([
        dragonRes.json(),
        rocketsRes.json(),
      ]);

      const combinedData = [...dragons, ...rockets];
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
    return () => clearSelectedRocket();
  }, [clearSelectedRocket]);

  const settings = {
    dots: false,
    infinite: false, // вимикаємо нескінченну прокрутку
    speed: 400,
    slidesToShow: window.innerWidth < 480 ? 1 : window.innerWidth < 768 ? 2 : 3, // Для адаптивності
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next),
    responsive: [
      {
        breakpoint: 768, // Для екранів менших за 768px
        settings: {
          slidesToShow: 2, // Показуємо 2 слайди
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // Для екранів менших за 480px
        settings: {
          slidesToShow: 1, // Показуємо 1 слайд
          slidesToScroll: 1,
        },
      },
    ],
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
      onRocketSelect(rocket);
      setFilteredImages(rocket.flickr_images || []);
    } else {
      setFilteredImages({});
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
    <div className={css.ourRocketContainer}>
      <h2 className={css.ourRocketText}>our rockets</h2>
      <Slider {...settings} ref={sliderRef}>
        {rockets.map((rocket) => (
          <div
            key={rocket.id}
            className={css.rocketCard}
            onClick={() => handleRocketClick(rocket)}
          >
            <div className={css.rocketCardInner}>
              <img
                className={css.rocketImage}
                src={rocket.flickr_images?.[0] || "/images/rocket.gif"}
                alt={rocket.name || "Rocket"}
              />
              <h4
                className="rocket-name"
                style={{ margin: "0px", cursor: "pointer" }}
              >
                {rocket.name || "Rocket"}
              </h4>
              <div className={css.rocketSpecs}>
                <p className={css.info}>
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
                <p className={css.info}>
                  <strong>DIAMETER</strong> {rocket.diameter?.meters ?? "4"} m /{" "}
                  {metersToFeet(rocket.diameter?.meters) ?? "13"} ft
                </p>
                <p className={css.info}>
                  <strong>SPACECRAFT VOLUME</strong>{" "}
                  {rocket.pressurized_capsule?.payload_volume?.cubic_meters ??
                    "9.3"}{" "}
                  m³ /{" "}
                  {metersToFeet(
                    rocket.pressurized_capsule?.payload_volume?.cubic_meters
                  ) ?? "328"}{" "}
                  ft³
                </p>
                <p className={css.info}>
                  <strong>TRUNK VOLUME</strong>{" "}
                  {rocket.trunk?.trunk_volume?.cubic_meters ?? "37"} m³ /{" "}
                  {metersToFeet(rocket.trunk?.trunk_volume?.cubic_meters) ??
                    "1300"}{" "}
                  ft³
                </p>
                <p className={css.info}>
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
                <p className={css.info}>
                  <strong>RETURN PAYLOAD MASS</strong>{" "}
                  {rocket.return_payload_mass?.kg ?? "3,000"} kg /{" "}
                  {kgToLbs(rocket.return_payload_mass?.kg) ?? "6,614"} lbs
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className={css.navigationContainer}>
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
            src="/images/Vector w.png"
            alt="navigation left"
            style={{ color: "white", padding: "0px 16px", cursor: "pointer" }}
          />
        </div>
        <div className={css.dotsContainer}>
          {rockets
            .slice(0, Math.ceil(rockets.length / settings.slidesToShow))
            .map((_, index) => (
              <div
                key={index}
                className={`dot ${index === activeSlide ? "active" : ""}`}
                onClick={() => sliderRef.current.slickGoTo(index)}
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
            src="/images/Vector w r.png"
            alt="navigation right"
            style={{ color: "white", padding: "0px 16px", cursor: "pointer" }}
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default OurRocket;
