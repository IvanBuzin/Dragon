import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const OurRocket = ({ onRocketSelect }) => {
  const [dragons, setDragons] = useState([]);
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const fetchDragons = async () => {
    const response = await fetch("https://api.spacexdata.com/v4/dragons");
    const data = await response.json();
    setDragons(data);
  };

  useEffect(() => {
    fetchDragons();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (current, next) => setActiveSlide(next),
  };

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const metersToFeet = (meters) => (meters * 3.28084).toFixed(1);
  const kgToLbs = (kg) => (kg * 2.20462).toFixed(3);

  const handleRocketClick = (dragon) => {
    onRocketSelect(dragon); // Виклик функції для передачі обраної ракети до Home компонента
  };

  return (
    <div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
      <h2 style={{ textAlign: "center" }}>Our rockets</h2>
      <Slider {...settings} ref={sliderRef}>
        {dragons.map((dragon) => (
          <div
            key={dragon.id}
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
            onClick={() => handleRocketClick(dragon)}
          >
            <div
              style={{
                display: "flex",
                gap: "24px",
                flexDirection: "column",
                padding: "24px",
                border: "1px solid #ccc",
                borderRadius: "40px",
                width: "375px",
                height: "501px",
              }}
            >
              <img
                src={dragon.flickr_images?.[0] || "./images/toy-rocket.gif"}
                alt={dragon.name || "Rocket"}
                style={{
                  width: "378px",
                  borderRadius: "20px",
                  maxHeight: "218px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                }}
              />
              <h4 style={{ margin: "0px" }}>{dragon.name || "Rocket"}</h4>
              <div
                style={{
                  textAlign: "left",
                  display: "flex",
                  gap: "12px",
                  width: "379px",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    height: "24px",
                    margin: "0px",
                    gap: "0px",
                    justifyContent: "space-between",
                  }}
                >
                  <strong>HEIGHT:</strong>{" "}
                  {dragon.height_w_trunk?.meters ?? "8.1"} m /{" "}
                  {metersToFeet(dragon.height_w_trunk?.meters) ?? "26.7"} ft
                </p>
                <p
                  style={{
                    display: "flex",
                    height: "24px",
                    margin: "0px",
                    gap: "0px",
                    justifyContent: "space-between",
                  }}
                >
                  <strong>DIAMETER:</strong> {dragon.diameter?.meters ?? "4"} m
                  / {metersToFeet(dragon.diameter?.meters) ?? "13"} ft
                </p>
                <p
                  style={{
                    display: "flex",
                    height: "24px",
                    margin: "0px",
                    gap: "0px",
                    justifyContent: "space-between",
                  }}
                >
                  <strong>SPACECRAFT VOLUME:</strong>{" "}
                  {dragon.pressurized_capsule?.payload_volume?.cubic_meters ??
                    "9.3"}{" "}
                  m³ /{" "}
                  {metersToFeet(
                    dragon.pressurized_capsule?.payload_volume?.cubic_meters
                  ) ?? "328"}{" "}
                  ft³
                </p>
                <p
                  style={{
                    display: "flex",
                    height: "24px",
                    margin: "0px",
                    gap: "0px",
                    justifyContent: "space-between",
                  }}
                >
                  <strong>TRUNK VOLUME:</strong>{" "}
                  {dragon.trunk?.trunk_volume?.cubic_meters ?? "37"} m³ /{" "}
                  {metersToFeet(dragon.trunk?.trunk_volume?.cubic_meters) ??
                    "1300"}{" "}
                  ft³
                </p>
                <p
                  style={{
                    display: "flex",
                    height: "24px",
                    margin: "0px",
                    gap: "0px",
                    justifyContent: "space-between",
                  }}
                >
                  <strong>LAUNCH PAYLOAD MASS:</strong>{" "}
                  {dragon.launch_payload_mass?.kg ?? "6,000"} kg /{" "}
                  {kgToLbs(dragon.launch_payload_mass?.kg) ?? "13,228"} lbs
                </p>
                <p
                  style={{
                    display: "flex",
                    height: "24px",
                    margin: "0px",
                    gap: "0px",
                    justifyContent: "space-between",
                  }}
                >
                  <strong>RETURN PAYLOAD MASS:</strong>{" "}
                  {dragon.return_payload_mass?.kg ?? "3,000"} kg /{" "}
                  {kgToLbs(dragon.return_payload_mass?.kg) ?? "6,614"} lbs
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="navigation-container">
        <img
          className="arrow"
          src="/src/images/Vector w.png"
          alt="navigation left"
          style={{ color: "white", padding: "0px 16px", cursor: "pointer" }}
          onClick={handlePrev}
        />
        <div className="dots-container">
          {dragons.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === activeSlide ? "active" : ""}`}
              onClick={() => sliderRef.current.slickGoTo(index)}
            ></div>
          ))}
        </div>
        <img
          className="arrow"
          src="/src/images/Vector w r.png"
          alt="navigation right"
          style={{ color: "white", padding: "0px 16px", cursor: "pointer" }}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default OurRocket;
