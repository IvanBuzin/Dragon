import { useState } from "react";
import Header from "./Header";
import OurRocket from "./OurRocket";
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
        display: "flex",
        flexDirection: "column",
        gap: "100px",
        padding: "48px 60px 0px 60px",
      }}
    >
      {/* Перша секція */}
      <section
        id="hero"
        style={{
          boxSizing: "border-box",
          height: "653px",
          width: "100%",
          background:
            "url('./src/images/toy-rocket.gif'), rgba(50, 38, 89, 0.5)",
          backgroundSize: "cover",

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
            }}
          >
            <OurRocket onRocketSelect={handleRocketSelection} />
          </section>
          {/* Третя секція: Rocket Statistics */}
          <section
            id="statistics"
            style={{
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
            color: "white",
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            height: "2608px",
            position: "absolute",
            marginLeft: "-60px",
            gap: "100px",
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

              background: "#000",
              margin: "0 auto",

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
              width: "100%",
              height: "834px",
            }}
          >
            <StarshipCapabilities type={selectedRocket} />
            <Starbase />
            {/* Кнопка для повернення до секції OurRockets */}
            <button
              onClick={handleBackToRockets}
              style={{
                marginTop: "24px",
                padding: "10px 20px",
                backgroundColor: "#333",
                color: "white",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
              }}
            >
              back to Our rockets
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;
