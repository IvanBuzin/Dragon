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

  // Конвертація метрів у футі та кілограмів у фунти
  const metersToFeet = (meters) => (meters * 3.28084).toFixed(1);
  const kgToLbs = (kg) => (kg * 2.20462).toFixed(3);

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
        <h2>Our rockets</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {dragons.map((dragon) => (
            <div
              key={dragon.id}
              style={{
                border: "1px solid #ccc",
                // marginBottom: "20px",
                padding: "24px",
                width: "427px",
                height: "553px",
                boxSizing: "border-box",
                color: "white",
                borderRadius: "40px",
              }}
            >
              <Slider {...settings}>
                {dragon.flickr_images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`${dragon.name} ${index + 1}`}
                      style={{
                        width: "379px",
                        height: "auto",
                        maxHeight: "219px",
                        border: "1px solid white",
                        borderRadius: "20px",
                      }}
                    />
                  </div>
                ))}
              </Slider>
              <h4>{dragon.name}</h4>
              {/* <p>
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
                <strong>Dry Mass:</strong> {dragon.dry_mass_kg} kg /{" "}
                {kgToLbs(dragon.dry_mass_kg)} lbs
              </p> */}
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  <strong>Height</strong>
                </span>
                <span>
                  {dragon.height_w_trunk?.meters} m /{" "}
                  {metersToFeet(dragon.height_w_trunk?.meters)} ft
                </span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  <strong>Diameter</strong>
                </span>
                <span>
                  {" "}
                  {dragon.diameter?.meters} m /{" "}
                  {metersToFeet(dragon.diameter?.meters)} ft
                </span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span>
                  <strong>Spacecraft Volume</strong>{" "}
                </span>
                <span>
                  {dragon.pressurized_capsule?.payload_volume?.cubic_meters} m³
                </span>
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>Trunk Volume</strong>{" "}
                {dragon.trunk?.trunk_volume?.cubic_meters} m³
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>Launch Payload Mass</strong>{" "}
                {dragon.launch_payload_mass?.kg} kg /{" "}
                {kgToLbs(dragon.launch_payload_mass?.kg)} lbs
              </p>
              <p style={{ display: "flex", justifyContent: "space-between" }}>
                <strong>Return Payload Mass</strong>{" "}
                {dragon.return_payload_mass?.kg} kg /{" "}
                {kgToLbs(dragon.return_payload_mass?.kg)} lbs
              </p>

              {/*Карусель*/}
            </div>
          ))}
        </div>
      </div>
    </PullToRefresh>
  );
};

export default DragonInfo;
