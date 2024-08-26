import { useState } from "react";
import Header from "./Header";
import OurRockets from "./OurRocket";
import DragonInfo from "./DragonInfo/DragonInfo";
import StarshipCapabilities from "./StarshipCapabilities";
// import Starbase from "./Starbase";
import About from "./About";
import RocketStatistics from "./RocketStatistics";
import Team from "./Team";

const Home = () => {
  const [selectedRocket, setSelectedRocket] = useState(null);

  const handleRocketSelection = (rocket) => {
    setSelectedRocket(rocket);
  };

  return (
    <div
      style={{
        color: "white",
        maxHeight: "3983px",
        width: "1321px",
        position: "absolute",
        display: "flex",
        alignItems: "flex-start",
        gap: "100px",
        flexDirection: "column",
        left: "60px",
        top: "48px",
        padding: "0px",
        scrollBehavior: "smooth",
      }}
    >
      {/* Перша секція */}
      <section
        id="hero"
        style={{
          height: "649px",
          border: selectedRocket ? "none" : "1px solid white",
          borderRadius: "40px",
          width: "100%",
        }}
      >
        <Header />
      </section>

      {/* Друга секція */}
      <section
        id="rockets"
        style={{
          height: "755px",
          width: "100%",
          display: selectedRocket ? "none" : "block",
        }}
      >
        <OurRockets onRocketSelect={handleRocketSelection} />
      </section>

      {/* Третя секція: Rocket Statistics */}
      <section
        id="statistics"
        style={{
          display: selectedRocket ? "none" : "block",
          height: "146px",
        }}
      >
        <RocketStatistics />
      </section>

      {/* Четверта секція */}
      <section
        id="about"
        style={{
          height: "644px",
          width: "100%",
          display: selectedRocket ? "none" : "block",
        }}
      >
        <About />
      </section>

      {/* П'ята секція */}
      <section
        id="team"
        style={{
          height: "551px",
          width: "100%",
          display: selectedRocket ? "none" : "block",
        }}
      >
        <Team />
      </section>

      {/* Шоста секція */}
      <section
        id="starship"
        style={{
          height: "834px",
          border: "1px solid white",
          width: "1806px",
          position: "absolute",
          left: "calc(50% - (1806px/2))",
          top: "3297px",
        }}
      >
        <StarshipCapabilities />
      </section>

      {/* Інформація про обрану ракету */}
      {selectedRocket && (
        <>
          <section
            id="dragonInfo"
            style={{
              width: "1316px",
              height: "615px",
              top: "132px",
              left: "1px",
              gap: "0px",
              position: "absolute",
              background: "#000",
              opacity: "0px",
            }}
          >
            <DragonInfo rocket={selectedRocket.name} />
          </section>
          <section
            id="starship-n"
            style={{
              border: "1px solid white",
              width: "1806px",
              background: "#000",
              left: "calc(50% - (1806px/2))",
              top: "847px",
              position: "absolute",
              opacity: "0px",
            }}
          >
            <StarshipCapabilities />
          </section>
          {/* <Starbase /> */}
        </>
      )}
    </div>
  );
};

export default Home;
