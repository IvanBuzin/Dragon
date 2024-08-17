import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StarshipCapabilities = () => {
  const [capabilities, setCapabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null); // Додано useRef для керування навігацією
  const localStorageKey = "capabilitiesData";

  const saveToLocalStorage = (data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  };

  const fetchData = () => {
    return fetch("https://api.spacexdata.com/v4/dragons") // замініть на ваш API для отримання даних про можливості Starship
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCapabilities(data);
        saveToLocalStorage(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const cachedData = loadFromLocalStorage();

    if (cachedData) {
      setCapabilities(cachedData);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      style={{
        backgroundColor: "#111" /* delete*/,
        color: "#fff",
        display: "flex",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Slider {...settings} ref={sliderRef}>
        {capabilities.map((capability, index) => (
          <div
            key={index}
            style={{
              textAlign: "center",
              display: "flex",
            }}
          >
            <img
              // src={capability.image}
              alt={capability.title}
              src="/src/images/download (10).png"
              style={{ width: "100%", maxHeight: "834px" }}
            />{" "}
            {/* <h3>{capability.title}</h3> */}
            {/* <p>{capability.description}</p> */}
            <div
              style={{
                flexDirection: "column",
                marginLeft: "60px",
                justifyContent: "space-between",

                marginTop: "-360px",
                display: "flex",

                alignItems: "flex-start",
                padding: "0px",
                gap: "32px",
                // position: "absolute",
                width: "1321px",
                height: "366px",
                left: "243px",
                top: "436px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "453px",
                  gap: "24px",
                }}
              >
                <h2 style={{}}>Starship Capabilities</h2>{" "}
                <p style={{ width: "453px", margin: "0px" }}>
                  As the most powerful launch system ever developed, Starship
                  will be able to carry up to 100 people on long-duration,
                  interplanetary flights. Starship will also help enable
                  satellite delivery, the development of a Moon base, and
                  point-to-point transport here on Earth.
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0px",
                  gap: "12px",
                  width: "1321px",
                  height: "62px",
                  flex: "none",
                  order: 2,
                  alignSelf: "stretch",
                  flexGrow: 0,
                }}
              >
                <div
                  style={{
                    padding: "0px 16px",
                    cursor: "pointer",
                  }}
                  onClick={() => sliderRef.current.slickPrev()} //Перехід до попереднього слайда
                >
                  <img
                    src="/src/images/Vector w.png"
                    alt="navigation left"
                    style={{ color: "white" }}
                  />
                </div>{" "}
                <ul
                  className="slick-dots"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    listStyle: "none",
                    padding: "0",
                  }}
                ></ul>
                <div
                  style={{
                    padding: "0px 16px",
                    cursor: "pointer",
                  }}
                  onClick={() => sliderRef.current.slickNext()} // Перехід до наступного слайда
                >
                  <img
                    src="/src/images/Vector w r.png"
                    alt="navigation right"
                    style={{ color: "white" }}
                  />
                </div>{" "}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StarshipCapabilities;
