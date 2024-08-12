import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PullToRefresh from "react-pull-to-refresh";

const DragonInfo = () => {
  const [dragons, setDragons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ключ для збереження даних у LocalStorage
  const localStorageKey = "dragonsData";

  // Функція для збереження даних у LocalStorage
  const saveToLocalStorage = (data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  };

  // Функція для завантаження даних із LocalStorage
  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  };

  // Функція для отримання даних з API
  const fetchData = () => {
    return fetch("https://api.spacexdata.com/v4/dragons")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDragons(data);
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

    // Якщо є кешовані дані, використовуємо їх
    if (cachedData) {
      setDragons(cachedData);
      setLoading(false);
    }

    // Робимо фоновий запит на отримання нових даних
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  // Налаштування для каруселі
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <PullToRefresh onRefresh={fetchData}>
      <div>
        <h1>dive deep in to the future</h1>
        <h2>Our rockets</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          {dragons.map((dragon) => (
            <div
              key={dragon.id}
              style={{
                border: "1px solid #ccc",
                marginBottom: "20px",
                padding: "10px",
                width: "427px",
                boxSizing: "border-box",
                color: "white",
              }}
            >
              <h3>{dragon.name}</h3>
              <p>
                <strong>Description:</strong> {dragon.description}
              </p>
              <p>
                <strong>First Flight:</strong> {dragon.first_flight}
              </p>
              <p>
                <strong>Type:</strong> {dragon.type}
              </p>
              <p>
                <strong>Crew Capacity:</strong> {dragon.crew_capacity}
              </p>
              <p>
                <strong>Dry Mass (kg):</strong> {dragon.dry_mass_kg}
              </p>

              {/*Карусель*/}
              <Slider {...settings}>
                {dragon.flickr_images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`${dragon.name} ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "300px",
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          ))}
        </div>
      </div>
    </PullToRefresh>
  );
};

export default DragonInfo;
