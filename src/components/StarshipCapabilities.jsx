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
    <div style={{ padding: "20px", backgroundColor: "#111", color: "#fff" }}>
      <h2>Starship Capabilities</h2>
      <p>
        As the most powerful launch system ever developed, Starship will be able
        to carry up to 100 people on long-duration, interplanetary flights.
        Starship will also help enable satellite delivery, the development of a
        Moon base, and point-to-point transport here on Earth.
      </p>
      <Slider {...settings}>
        {capabilities.map((capability, index) => (
          <div key={index} style={{ padding: "10px", textAlign: "center" }}>
            <img
              src={capability.image}
              alt={capability.title}
              style={{ width: "100%", height: "auto", maxHeight: "300px" }}
            />
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StarshipCapabilities;
