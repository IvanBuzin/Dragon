import { useEffect, useState } from "react";

const RocketStatistics = () => {
  const [statistics, setStatistics] = useState({
    totalLaunches: 0,
    visitsToISS: 0,
    totalReflights: 0,
  });

  const fetchStatistics = async () => {
    try {
      // Отримати інформацію про всі запуски
      const launchesResponse = await fetch(
        "https://api.spacexdata.com/v4/launches"
      );
      if (!launchesResponse.ok) {
        throw new Error(`HTTP error! Status: ${launchesResponse.status}`);
      }
      const launches = await launchesResponse.json();

      // Оновлення статистики
      const totalLaunches = launches.length;
      const visitsToISS = launches.filter(
        (launch) =>
          launch.details &&
          launch.details.includes("International Space Station")
      ).length;
      const totalReflights = launches.reduce(
        (count, launch) =>
          count +
          (launch.cores
            ? launch.cores.filter((core) => core.reused).length
            : 0),
        0
      );

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
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", color: "white" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          gap: "32px",
        }}
      >
        <div
          style={{
            flex: "1 1 calc(33.33% - 20px)",

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
