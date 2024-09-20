import { useEffect, useState } from "react";
import css from "./RocketStatistics.module.css";

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
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <>
      <div className={css.statistics}>
        <div className={css.statBlock}>
          <h2 className={css.statH2}>
            {statistics?.totalLaunches || "Loading..."}
          </h2>
          <h3 className={css.statH3}>Total Launches</h3>
        </div>
        <div className={css.statBlock}>
          <h2 className={css.statH2}>{statistics.visitsToISS}</h2>
          <h3 className={css.statH3}>Visits to the ISS</h3>
        </div>
        <div className={css.statBlock}>
          <h2 className={css.statH2}>{statistics.totalReflights}</h2>
          <h3 className={css.statH3}>Total Reflights</h3>
        </div>
      </div>
    </>
  );
};

export default RocketStatistics;
