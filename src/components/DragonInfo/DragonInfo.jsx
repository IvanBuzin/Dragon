import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PullToRefresh from "react-pull-to-refresh";

const DragonInfo = () => {
  const [dragons, setDragons] = useState([]);
  const [selectedDragon, setSelectedDragon] = useState(null); // Додано стан для обраної ракети
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sliderRef = useRef(null); // Додано реф для слайдера

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
        setSelectedDragon(data[0]); // Автоматично вибираємо першу ракету
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
      console.log("Using cached data:", cachedData);
      setDragons(cachedData);
      setSelectedDragon(cachedData[0]); // Встановлюємо першу ракету при завантаженні кешу
      setLoading(false);
    } else {
      console.log("Fetching new data...");
      fetchData();
    }
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
    dots: false, // Додавання точок навігації
    infinite: false,
    speed: 500,
    slidesToShow: 1, // Кількість блоків, що відображаються одночасно
    slidesToScroll: 1,
    arrows: false, // // Вимкнено внутрішні стрілки, ми будемо використовувати зовнішні
  };

  return (
    <PullToRefresh onRefresh={fetchData}>
      <div
        style={{
          display: "flex",
          gap: "32px",
          flexDirection: "column",
        }}
      >
        <h2 style={{}}>
          {selectedDragon ? selectedDragon.name : "Select a Dragon"}
        </h2>
        <Slider {...settings} ref={sliderRef}>
          {dragons.map((dragon) => (
            <div
              key={dragon.id}
              style={{
                border: "1px solid #ccc",
                padding: "24px",
                width: "427px",
                height: "553px",
                boxSizing: "border-box",
                color: "white",
                borderRadius: "40px",
                cursor: "pointer",
              }}
              onClick={() => {
                setSelectedDragon(dragon); // Встановлюємо вибраного дракона
                sliderRef.current.slickGoTo(dragons.indexOf(dragon)); // Переміщуємо карусель до вибраного слайда
              }}
            >
              <div
                style={{
                  border: "1px solid white",
                  borderRadius: "24px",
                  padding: "24px",
                  height: "457px",
                  display: "flex",
                  flexDirection: "row",
                  gap: "20px",
                  alignItems: "center",
                }}
              >
                <img
                  src={dragon.flickr_images[0]}
                  alt={dragon.name}
                  style={{
                    width: "791px",
                    height: "457px",

                    maxHeight: "457px",
                    border: "1px 0px 0px 0px solid white",
                    borderRadius: "20px",
                    // opacity: "0",
                  }}
                />
                <div
                  style={{
                    justifyContent: "space-between",
                    display: "flex",
                    width: "458px",
                    height: "457px",
                    gap: "32px",
                    flexDirection: "column",
                  }}
                >
                  <h4 style={{ fontWeight: "700", margin: "0px" }}>
                    {dragon.name}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      margin: "0px",
                      height: "395px",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",
                        // opacity: "0px",
                      }}
                    >
                      <span>
                        <strong>Height</strong>
                      </span>
                      <span>
                        {dragon.height_w_trunk?.meters} m /{" "}
                        {metersToFeet(dragon.height_w_trunk?.meters)} ft
                      </span>
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",
                      }}
                    >
                      <span>
                        <strong>Diameter</strong>
                      </span>
                      <span>
                        {" "}
                        {dragon.diameter?.meters} m /{" "}
                        {metersToFeet(dragon.diameter?.meters)} ft
                      </span>
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",
                        // opacity: "0px",
                      }}
                    >
                      <span>
                        <strong>Spacecraft Volume</strong>{" "}
                      </span>
                      <span>
                        {
                          dragon.pressurized_capsule?.payload_volume
                            ?.cubic_meters
                        }{" "}
                        m³
                      </span>
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",
                        // opacity: "0px",
                      }}
                    >
                      <strong>Trunk Volume</strong>{" "}
                      {dragon.trunk?.trunk_volume?.cubic_meters} m³
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",
                        // opacity: "0px",
                      }}
                    >
                      <strong>Launch Payload Mass</strong>{" "}
                      {dragon.launch_payload_mass?.kg} kg /{" "}
                      {kgToLbs(dragon.launch_payload_mass?.kg)} lbs
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",
                        // opacity: "0px",
                      }}
                    >
                      <strong>Trunk Volume</strong>{" "}
                      {dragon.trunk?.trunk_volume?.cubic_meters} m³
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",
                        // opacity: "0px",
                      }}
                    >
                      <strong>Launch Payload Mass</strong>{" "}
                      {dragon.launch_payload_mass?.kg} kg /{" "}
                      {kgToLbs(dragon.launch_payload_mass?.kg)} lbs
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",
                        // opacity: "0px",
                      }}
                    >
                      <strong>Return Payload Mass</strong>{" "}
                      {dragon.return_payload_mass?.kg} kg /{" "}
                      {kgToLbs(dragon.return_payload_mass?.kg)} lbs
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",
                        // opacity: "0px",
                      }}
                    >
                      <strong>Return Payload Mass</strong>{" "}
                      {dragon.return_payload_mass?.kg} kg /{" "}
                      {kgToLbs(dragon.return_payload_mass?.kg)} lbs
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",
                        // opacity: "0px",
                      }}
                    >
                      <span>
                        <strong>Spacecraft Volume</strong>{" "}
                      </span>
                      <span>
                        {
                          dragon.pressurized_capsule?.payload_volume
                            ?.cubic_meters
                        }{" "}
                        m³
                      </span>
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "458px",
                        height: "25px",
                        padding: "0px 0px 8px 0px",
                        gap: "0px",
                        border: "0px 0px 1px 0px",
                        margin: "0px",

                        // opacity: "0px",
                      }}
                    >
                      <strong>Return Payload Mass</strong>{" "}
                      {dragon.return_payload_mass?.kg} kg /{" "}
                      {kgToLbs(dragon.return_payload_mass?.kg)} lbs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </PullToRefresh>
  );
};

export default DragonInfo;
