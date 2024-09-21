import Slider from "react-slick";
import { useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import css from "./Starship.module.css";

const Starship = ({ rocket }) => {
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Якщо ракета не вибрана, використовуємо дефолтні дані
  const defaultImages = [
    "/images/photo 1.jpg",
    "/images/photo 2.jpg",
    "/images/photo 3.jpg",
    "/images/photo 4.jpg",
    "/images/photo 5.jpg",
    "/images/photo 6.jpg",
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
    <div className={css.StarshipContainer}>
      <Slider ref={sliderRef} {...settings} className={css.StarshipSlider}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              className={css.StarshipImg}
              src={image}
              alt={`Rocket image ${index + 1}`}
            />
          </div>
        ))}
      </Slider>
      <div className={css.StarshipBlock}>
        <div className={css.StarshipCard}>
          <h2 className={css.StarshipH2}>Starship Capabilities</h2>
          <p className={css.StarshipP}>{description}</p>
        </div>

        {/* Навігація */}
        <div className={css.navContainerStarship}>
          <button
            className={`${css.navButton} arrow ${
              activeSlide === 0 ? css.navButtonDisabled : ""
            }`}
            onClick={handlePrev}
            disabled={activeSlide === 0}
          >
            <img
              className={css.navIcon}
              src="/images/Vector w.png"
              alt="Previous"
            />
          </button>

          <div className={css.StarshipDotsContainer}>
            {images.map((_, index) => (
              <div
                key={index}
                className={` dot ${index === activeSlide ? "active" : ""}`}
                onClick={() => sliderRef.current.slickGoTo(index)}
              ></div>
            ))}
          </div>

          <button
            className={`${css.navButton} arrow ${
              activeSlide === images.length - 1 ? css.navButtonDisabled : ""
            }`}
            onClick={handleNext}
            disabled={activeSlide === images.length - 1}
          >
            <img
              className={css.navIcon}
              src="/images/Vector w r.png"
              alt="Next"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Starship;
