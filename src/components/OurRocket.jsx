import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PullToRefresh from "react-pull-to-refresh";

const OurRocket = () => {
  const [dragons, setDragons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRocketId, setExpandedRocketId] = useState(null);

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
      setLoading(false);
    } else {
      console.log("Fetching new data...");
      fetchData();
    }
  }, []);

  const toggleExpandedRocket = (id) => {
    setExpandedRocketId((prevId) => (prevId === id ? null : id));
  };

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
  const sliderSettings = {
    dots: true, // Додавання точок навігації
    infinite: false,
    speed: 500,
    slidesToShow: 1, // Кількість блоків, що відображаються одночасно
    slidesToScroll: 1,
    arrows: false, // // Вимкнено внутрішні стрілки, ми будемо використовувати зовнішні
  };

  return (
    <PullToRefresh onRefresh={fetchData}>
      <div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
        <h2
          style={{
            // marginBottom: "32px",
            textAlign: "center",
          }}
        >
          Our rockets
        </h2>
        <Slider {...sliderSettings} ref={sliderRef}>
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
              }}
              onClick={() => toggleExpandedRocket(dragon.id)}
            >
              <div
                style={{
                  width: "377px",
                  border: "1px solid white",
                  borderRadius: "24px",
                  padding: "24px",
                  height: "505px",
                }}
              >
                <img
                  src={
                    dragon.flickr_images?.[0] || "./images//toy-rocket.gif.gif"
                  }
                  alt={dragon.name || "Rocket 1"}
                  style={{
                    width: "379px",
                    height: "auto",
                    maxHeight: "219px",
                    border: "1px solid white",
                    borderRadius: "20px",
                    marginBottom: "16px",
                  }}
                />
                <div style={{}}>
                  <h4>{dragon.name || "Rocket 1"}</h4>
                  {expandedRocketId === dragon.id && (
                    <div style={{ textAlign: "left" }}>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          <strong>Height</strong>
                        </span>
                        <span>
                          {dragon.height_w_trunk?.meters ?? "8.1"} m /{" "}
                          {metersToFeet(dragon.height_w_trunk?.meters) ??
                            "26.7"}{" "}
                          ft
                        </span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          <strong>Diameter</strong>
                        </span>
                        <span>
                          {" "}
                          {dragon.diameter?.meters ?? "4"} m /{" "}
                          {metersToFeet(dragon.diameter?.meters) ?? "13"} ft
                        </span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>
                          <strong>Spacecraft Volume</strong>{" "}
                        </span>
                        <span>
                          {dragon.pressurized_capsule?.payload_volume
                            ?.cubic_meters ?? "9.3"}{" "}
                          m³/
                          {metersToFeet(
                            dragon.pressurized_capsule?.payload_volume
                              ?.cubic_meters
                          ) ?? "328"}{" "}
                          ft³
                        </span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <strong>Trunk Volume</strong>{" "}
                        {dragon.trunk?.trunk_volume?.cubic_meters ?? "37"} m³/
                        {metersToFeet(
                          dragon.trunk?.trunk_volume?.cubic_meters
                        ) ?? "1300"}{" "}
                        ft³
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <strong>Launch Payload Mass</strong>{" "}
                        {dragon.launch_payload_mass?.kg ?? "6,000"} kg /{" "}
                        {kgToLbs(dragon.launch_payload_mass?.kg ?? "13,228")}{" "}
                        lbs
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <strong>Return Payload Mass</strong>{" "}
                        {dragon.return_payload_mass?.kg ?? "3,000"} kg /{" "}
                        {kgToLbs(dragon.return_payload_mass?.kg ?? "6,614")} lbs
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
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
    </PullToRefresh>
  );
};

export default OurRocket;
