import Slider from "react-slick";
import { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StarshipCapabilities = ({ rocket }) => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Якщо ракета не вибрана, використовуємо дефолтні дані
  const defaultImages = [
    "/src/images/foto 1.jpg",
    "./src/images/starhip_2.jpg",
    "./src/images/starhip_3.jpg",
    "./src/images/starhip_4.jpg",
    "./src/images/starhip_5.jpg",
    "./src/images/starhip_6.jpg",
  ];
  const defaultDescription =
    "As the most powerful launch system ever developed, Starship will be able to carry up to 100 people on long-duration, interplanetary flights. Starship will also help enable satellite delivery, the development of a Moon base, and point-to-point transport here on Earth.";

  const images =
    rocket?.flickr_images?.length > 0 ? rocket.flickr_images : defaultImages;
  const description = rocket?.description || defaultDescription;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (current) => setActiveSlide(current),
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Slider
        ref={sliderRef}
        {...settings}
        style={{ width: "100%", maxWidth: "1440px" }}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Rocket image ${index + 1}`}
              style={{
                width: "1440px",
                height: "834px",
                position: "relative",
                overflow: "hidden",
              }}
            />
          </div>
        ))}
      </Slider>
      <div
        style={{
          display: "flex",
          gap: "32px",
          flexDirection: "column",
          width: "1321px",
          height: "366px",
          position: "absolute",
          left: "60px",
          marginTop: "436px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "453px",
            height: "272px",
            gap: "24px",
          }}
        >
          <h2>Starship Capabilities</h2>
          <p style={{ width: "453px", margin: "0px", lineHeight: "24px" }}>
            {description}
          </p>
        </div>

        {/* Навігація */}
        <div
          className="navigation-container"
          style={{ display: "flex", alignItems: "center" }}
        >
          <button
            className={`arrow ${activeSlide === 0 ? "disabled" : ""}`}
            onClick={handlePrev}
            disabled={activeSlide === 0}
            style={{
              background: "none",
              border: "none",
              cursor: activeSlide === 0 ? "not-allowed" : "pointer",
            }}
          >
            <img
              className="arrow-icon"
              src="./src/images/Vector w.png"
              alt="Previous"
              style={{ width: "24px", height: "24px" }}
            />
          </button>

          <div
            className="dots-container"
            style={{ display: "flex", gap: "8px", margin: "0 20px" }}
          >
            {images.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === activeSlide ? "active" : ""}`}
                onClick={() => sliderRef.current.slickGoTo(index)}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: index === activeSlide ? "#fff" : "#888",
                  cursor: "pointer",
                }}
              ></div>
            ))}
          </div>

          <button
            className={`arrow ${
              activeSlide === images.length - 1 ? "disabled" : ""
            }`}
            onClick={handleNext}
            disabled={activeSlide === images.length - 1}
            style={{
              background: "none",
              border: "none",
              cursor:
                activeSlide === images.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            <img
              className="arrow-icon"
              src="./src/images/Vector w r.png"
              alt="Next"
              style={{ width: "24px", height: "24px" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarshipCapabilities;
