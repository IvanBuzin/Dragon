import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StarshipCapabilities = () => {
  const [capabilities, setCapabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  };

  return (
    <div
      style={{
        backgroundColor: "#111" /* delete*/,
        color: "#fff",
        display: "flex",
        marginLeft: "60px",
        marginTop: "436px",
        width: "600px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "168px",
          justifyContent: "space-between",
          width: "453px",
          height: "272px",
        }}
      >
        <h2 style={{}}>Starship Capabilities</h2>
        <p style={{ margin: "0px" }}>
          As the most powerful launch system ever developed, Starship will be
          able to carry up to 100 people on long-duration, interplanetary
          flights. Starship will also help enable satellite delivery, the
          development of a Moon base, and point-to-point transport here on
          Earth.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "62px",
        }}
      >
        <div
          style={{
            marginTop: "24px",
            padding: "0px 16px",
          }}
        >
          <img
            src="/src/images/Vector w.png"
            alt="navigation left"
            style={{ color: "white" }}
          />
        </div>
        <div
          className="navigation-dots"
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            className="dot"
            data-slide="0"
            style={{
              width: "16px",
              height: "16px",
              gap: "12px",
              opacity: "0px",
              borderRadius: "50px",
            }}
          ></button>
          <button
            className="dot"
            data-slide="1"
            style={{
              width: "16px",
              height: "16px",
              gap: "0px",
              opacity: "0px",
              borderRadius: "50px",
            }}
          ></button>
          <button
            className="dot"
            data-slide="2"
            style={{
              width: "16px",
              height: "16px",
              gap: "12px",
              opacity: "0px",
              borderRadius: "50px",
            }}
          ></button>
          <button
            className="dot"
            data-slide="3"
            style={{
              width: "16px",
              height: "16px",
              gap: "12px",
              opacity: "0px",
              borderRadius: "50px",
            }}
          ></button>
          <button
            className="dot"
            data-slide="3"
            style={{
              width: "16px",
              height: "16px",
              gap: "12px",
              opacity: "0px",
              borderRadius: "50px",
            }}
          ></button>
        </div>{" "}
        <div
          style={{
            marginTop: "24px",
            padding: "0px 16px",
          }}
        >
          <img src="/src/images/Vector w r.png" alt="navigation left" />
        </div>
      </div>
      <Slider {...settings}>
        {capabilities.map((capability, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <img
              // src={capability.image}
              // alt={capability.title}
              src="/src/images/download (10).png"
              style={{ width: "100%", height: "auto", maxHeight: "534px" }}
            />
            {/* <h3>{capability.title}</h3>
            <p>{capability.description}</p> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StarshipCapabilities;
