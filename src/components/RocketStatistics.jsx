import { useEffect, useState } from "react";

const RocketStatistics = () => {
  const [statistics, setStatistics] = useState({
    totalLaunches: 0,
    visitsToISS: 0,
    totalReflights: 0,
  });

  // Функція для отримання статистики з API (замініть на реальний запит)
  const fetchStatistics = () => {
    // Замість цього API-запиту ви можете використовувати реальні дані
    // або замінити на ручний введення даних
    setStatistics({
      totalLaunches: 200,
      visitsToISS: 50,
      totalReflights: 30,
    });
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Rocket Statistics</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          color: "white",
        }}
      >
        <div
          style={{
            width: "30%",
            backgroundColor: "#222",
            padding: "20px",
            margin: "10px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2>{statistics.totalLaunches}</h2>
          <h3>Total Launches</h3>
        </div>
        <div
          style={{
            width: "30%",
            backgroundColor: "#222",
            padding: "20px",
            margin: "10px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2>{statistics.visitsToISS}</h2>
          <h3>Visits to the ISS</h3>
        </div>
        <div
          style={{
            width: "30%",
            backgroundColor: "#222",
            padding: "20px",
            margin: "10px",
            borderRadius: "8px",
            textAlign: "center",
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
