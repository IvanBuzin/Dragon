import { useEffect, useState } from "react";

const RocketStatistics = () => {
  const [statistics, setStatistics] = useState({
    totalLaunches: 43,
    visitsToISS: 46,
    totalReflights: 25,
  });

  const fetchStatistics = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v4/dragons");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      let totalLaunches = 0;
      let visitsToISS = 0;
      let totalReflights = 0;

      data.forEach((dragon) => {
        // Загальна кількість запусків
        totalLaunches += dragon.launches.length;

        // Підрахунок місій на МКС (ISS)
        visitsToISS += dragon.launches.filter((launch) =>
          launch.includes("iss")
        ).length;
        visitsToISS += issMissions;

        // Підрахунок повторних запусків (якщо космічний корабель активний і здійснював більше одного запуску)
        totalReflights += dragon.launches.length > 1 ? 1 : 0;
      });

      setStatistics({
        totalLaunches,
        visitsToISS,
        totalReflights,
      });
      console.log("Fetched statistics:", {
        totalLaunches,
        visitsToISS,
        totalReflights,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
    // console.log(statistics); // Перевірка, що дані надходять
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
