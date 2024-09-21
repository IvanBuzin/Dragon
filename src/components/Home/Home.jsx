import { useRef, useState } from "react";
import Header from "../Header/Header";
import OurRocket from "../OurRocket/OurRocket";
import Starship from "../Starship/Starship";
import Starbase from "../Starbase/Starbase";
import About from "../About/About";
import RocketStatistics from "../RocketStatistics/RocketStatistics";
import Team from "../Team/Team";
import RocketInfo from "../RocketInfo/RocketInfo";
import Login from "../Login";
import Register from "../Register";
import ErrorBoundary from "../ErrorBoundary";
import css from "./Home.module.css";

const Home = () => {
  const [selectedRocket, setSelectedRocket] = useState(null);
  const rocketsRef = useRef(null);
  const [showForm, setShowForm] = useState(false);

  const handleRocketSelection = (rocket) => {
    setSelectedRocket(rocket);
  };
  const handleBackToRockets = () => {
    setSelectedRocket(null);
    if (rocketsRef.current) {
      rocketsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleHomeClick = () => {
    setSelectedRocket(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Обробник для переходу на реєстрацію/аутентифікацію
  const handleContactFormClick = (formType) => {
    setShowForm(formType); // formType може бути 'register' або 'login'
  };

  return (
    <div className={css.homeContent}>
      {/* Перша секція */}
      <section
        id="hero"
        style={{
          boxSizing: "border-box",
          height: "653px",
          width: "100%",
          background: "url('/images/rocket.gif'), rgba(50, 38, 89, 0.5)",
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
        <Header
          onHomeClick={handleHomeClick}
          onContactFormClick={handleContactFormClick}
        />
      </section>

      {/* Друга секція */}
      {!selectedRocket && (
        <>
          <section
            id="rockets"
            style={{
              // height: "755px",
              width: "100%",
            }}
            ref={rocketsRef}
          >
            <OurRocket onRocketSelect={handleRocketSelection} />
          </section>
          {/* Третя секція: Rocket Statistics */}
          <section
            id="statistics"
            style={{
              height: "100%",
            }}
          >
            <ErrorBoundary>
              <RocketStatistics />
            </ErrorBoundary>
          </section>
          {/* Четверта секція */}
          <section
            id="about"
            style={{
              // height: "644px",
              width: "100%",
            }}
          >
            <About />
          </section>
          {/* П'ята секція */}
          <section
            id="team"
            style={{
              height: "100%",
              maxHeight: "551px",
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
            <Starship />
          </section>
        </>
      )}
      {/* Інформація про обрану ракету */}
      {selectedRocket && (
        <div className={css.rocketInfoSection}>
          <section id="rocketInfo" className={css.RocketInfoContent}>
            <RocketInfo rocket={selectedRocket} />
          </section>
          <section
            id="starship-n"
            style={{
              width: "100%",
              height: "834px",
            }}
          >
            <Starship rocket={selectedRocket} />
            <Starbase />
            {/* Кнопка для повернення до секції OurRockets */}
            <button
              onClick={handleBackToRockets}
              className={css.buttonBeck}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#555")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#333")}
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
