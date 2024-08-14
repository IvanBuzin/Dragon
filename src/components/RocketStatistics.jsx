import { useEffect, useState } from "react";

const RocketStatistics = () => {
  const [statistics, setStatistics] = useState({
    totalLaunches: 0,
    visitsToISS: 0,
    totalReflights: 0,
  });

  // Функція для отримання статистики з API (замініть на реальний запит)
  const fetchStatistics = () => {
    return fetch("https://api.spacexdata.com/v4/dragons")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        const totalLaunches = data.length;
        const visitsToISS = data.reduce(
          (acc, dragon) => acc + dragon.flickr_images.length,
          0
        );
        const totalReflights = data.reduce(
          (acc, dragon) => acc + dragon.active,
          0
        );
        setStatistics({
          totalLaunches,
          visitsToISS,
          totalReflights,
        });
      })
      .catch((error) => {
        console.error("Fetch error: ", error);
      });
  };

  useEffect(() => {
    fetchStatistics();
    console.log(statistics); // Перевірка, що дані надходять
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          color: "white",
          gap: "32px",
        }}
      >
        <div
          style={{
            flex: "1 1 calc(33.33% - 20px)",
            backgroundColor: "#222",
            textAlign: "center",
            minWidth: "250px",
            width: "419px",
            height: "146px",
          }}
        >
          <h2>{statistics.totalLaunches}</h2>
          <h3>Total Launches</h3>
        </div>
        <div
          style={{
            flex: "1 1 calc(33.33% - 20px)",
            backgroundColor: "#222",
            textAlign: "center",
            minWidth: "250px",
            width: "419px",
            height: "146px",
          }}
        >
          <h2>{statistics.visitsToISS}</h2>
          <h3>Visits to the ISS</h3>
        </div>
        <div
          style={{
            flex: "1 1 calc(33.33% - 20px)",
            backgroundColor: "#222",
            textAlign: "center",
            minWidth: "250px",
            width: "419px",
            height: "146px",
          }}
        >
          <h2>{statistics.totalReflights}</h2>
          <h3>Total Reflights</h3>
        </div>
      </div>
    </div>
  );
};

export default RocketStatistics;
