import { useState } from "react";
import Header from "./Header";
import OurRockets from "./OurRocket";
import StarshipCapabilities from "./StarshipCapabilities";
import Starbase from "./Starbase";
import About from "./About";
import RocketStatistics from "./RocketStatistics";
import Team from "./Team";
import RocketInfo from "./RocketInfo";

const Home = () => {
  const [selectedRocket, setSelectedRocket] = useState(null);

  const handleRocketSelection = (rocket) => {
    setSelectedRocket(rocket);
  };
  const handleBackToRockets = () => {
    setSelectedRocket(null);
  };

  return (
    <div
      style={{
        color: "white",
        maxWidth: "1321px",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: "100px",
        padding: "48px 0 0 0",
        // maxHeight: "3149px",
        // width: "1321px",
        // position: "absolute",
        // display: "flex",
        // alignItems: "flex-start",
        // gap: "100px",
        // flexDirection: "column",
        // left: "60px",
        // top: "48px",
        // padding: "0px",
        // scrollBehavior: "smooth",
      }}
    >
      {/* Перша секція */}
      <section
        id="hero"
        style={{
          boxSizing: "border-box",
          height: "653px",
          width: "100%",
          background: "url('./src/images/toy-rocket.gif.gif')",

          border: selectedRocket
            ? "none"
            : "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "40px",
          flex: "none",
          order: 0,
          alignSelf: "stretch",
          flexGrow: 0,
        }}
      >
        <Header />
      </section>

      {/* Друга секція */}
      {!selectedRocket && (
        <>
          <section
            id="rockets"
            style={{
              height: "755px",
              width: "100%",
              // display: selectedRocket ? "none" : "block",
            }}
          >
            <OurRockets onRocketSelect={handleRocketSelection} />
          </section>
          {/* Третя секція: Rocket Statistics */}
          <section
            id="statistics"
            style={{
              // display: selectedRocket ? "none" : "block",
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
              // display: selectedRocket ? "none" : "block",
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
              // display: selectedRocket ? "none" : "block",
            }}
          >
            <Team />
          </section>

          {/* Шоста секція */}
          <section
            id="starship"
            style={{
              height: "834px",
              // width: "100%",

              width: "1440px",
              marginLeft: "-60px",
              // position: "absolute",
              // left: "calc(50% - (1806px/2))",
              // top: "3249px",
              // display: selectedRocket ? "none" : "block",
            }}
          >
            <StarshipCapabilities />
          </section>
        </>
      )}

      {/* Інформація про обрану ракету */}
      {selectedRocket && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            // height: selectedRocket ? "2608px" : "4131px",
          }}
        >
          <section
            id="rocketInfo"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              width: "1321px",
              height: "744px",
              gap: "32px",
              top: "48px",
              position: "absolute",
              background: "#000",

              order: 0,
              alignSelf: "stretch",
              flexGrow: 0,
            }}
          >
            <RocketInfo type={selectedRocket} />
          </section>
          <section
            id="starship-n"
            style={{
              width: "1440px",
              marginLeft: "-60px",
              // width: "1806px",
              // background: "#000",
              // left: "calc(50% - (1806px/2))",
              top: "892px",
              position: "absolute",
              // opacity: "1",
            }}
          >
            <StarshipCapabilities />

            <Starbase />
          </section>
          {/* Кнопка для повернення до секції OurRockets */}
          <button
            onClick={handleBackToRockets}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#333",
              color: "white",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Повернутись до ракет
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
