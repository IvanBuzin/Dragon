import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PullToRefresh from "react-pull-to-refresh";

const RocketInfo = ({ type }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sliderRef = useRef(null);

  // Ключ для збереження даних у LocalStorage
  const localStorageKey = `${type}Data`;

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
    const apiUrl =
      type === "dragon"
        ? "https://api.spacexdata.com/v4/dragons"
        : "https://api.spacexdata.com/v4/rockets";

    return fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setItems(data);
        saveToLocalStorage(data);
        setSelectedItem(data[0]); // Автоматично вибираємо перший елемент
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
      console.log("Using cached data:", cachedData);
      setItems(cachedData);
      setSelectedItem(cachedData[0]);
      setLoading(false);
    } else {
      console.log("Fetching new data...");
      fetchData();
    }
  }, [type]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const metersToFeet = (meters) => (meters * 3.28084).toFixed(1);
  const kgToLbs = (kg) => (kg * 2.20462).toFixed(3);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
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
        <h2>{selectedItem ? selectedItem.name : `Select a ${type}`}</h2>
        <Slider {...settings} ref={sliderRef}>
          {items.map((item) => (
            <div
              key={item.id}
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
                setSelectedItem(item);
                sliderRef.current.slickGoTo(items.indexOf(item));
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
                  src={item.flickr_images[0]}
                  alt={item.name}
                  style={{
                    width: "791px",
                    height: "457px",
                    maxHeight: "457px",
                    borderRadius: "20px",
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
                    {item.name}
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
                        margin: "0px",
                      }}
                    >
                      <strong>Height</strong>
                      <span>
                        {item.height_w_trunk?.meters ?? "8.1"} m /{" "}
                        {metersToFeet(item.height_w_trunk?.meters) ?? "26.7"} ft
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
                        {item.diameter?.meters ?? "4"} m /{" "}
                        {metersToFeet(item.diameter?.meters) ?? "13"} ft
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
                        <strong>Spacecraft Volume</strong>{" "}
                      </span>
                      <span>
                        {item.pressurized_capsule?.payload_volume
                          ?.cubic_meters ?? "9.3"}{" "}
                        m³ /{" "}
                        {metersToFeet(
                          item.pressurized_capsule?.payload_volume?.cubic_meters
                        ) ?? "328"}{" "}
                        ft³
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
                      <strong>Trunk Volume</strong>{" "}
                      {item.trunk?.trunk_volume?.cubic_meters ?? "37"} m³/
                      {metersToFeet(item.trunk?.trunk_volume?.cubic_meters) ??
                        "1300"}{" "}
                      ft³
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
                      <strong>Launch Payload Mass</strong>{" "}
                      {item.launch_payload_mass?.kg ?? "6,000"} kg /{" "}
                      {kgToLbs(item.launch_payload_mass?.kg) ?? "13,228"} lbs
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
                      <strong>Trunk Volume</strong>{" "}
                      {item.trunk?.trunk_volume?.cubic_meters ?? "37"} m³/
                      {metersToFeet(item.trunk?.trunk_volume?.cubic_meters) ??
                        "1300"}{" "}
                      ft³
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
                      <strong>Launch Payload Mass</strong>{" "}
                      {item.launch_payload_mass?.kg} kg /{" "}
                      {kgToLbs(item.launch_payload_mass?.kg)} lbs
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
                      <strong>Return Payload Mass</strong>{" "}
                      {item.return_payload_mass?.kg} kg /{" "}
                      {kgToLbs(item.return_payload_mass?.kg)} lbs
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
                      <strong>Return Payload Mass</strong>{" "}
                      {item.return_payload_mass?.kg ?? "3,000"} kg /{" "}
                      {kgToLbs(item.return_payload_mass?.kg) ?? "6,614"} lbs
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
                        <strong>Spacecraft Volume</strong>{" "}
                      </span>
                      <span>
                        {item.pressurized_capsule?.payload_volume
                          ?.cubic_meters ?? "9.3"}{" "}
                        m³/
                        {metersToFeet(
                          item.pressurized_capsule?.payload_volume?.cubic_meters
                        ) ?? "328"}{" "}
                        ft³
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
                      <strong>Return Payload Mass</strong>{" "}
                      {item.return_payload_mass?.kg} kg /{" "}
                      {kgToLbs(item.return_payload_mass?.kg)} lbs
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

export default RocketInfo;
