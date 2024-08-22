import About from "./About";
import DragonInfo from "./DragonInfo/DragonInfo";
import Header from "./Header";
import OurRocket from "./OurRocket";
import RocketStatistics from "./RocketStatistics";
import StarshipCapabilities from "./StarshipCapabilities";
import Team from "./Team";

const Home = () => {
  return (
    <>
      <div
        style={{
          color: "white",
          height: "3149px",
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
          scrollBehavior: "smooth", // додано для плавного скролінгу
        }}
      >
        {/* Перша секція */}
        <section
          id="hero"
          style={{
            height: "653px",
            border: "1px solid white",
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
          }}
        >
          <OurRocket />
        </section>
        <section
          id="rockets"
          style={{
            height: "755px",
            border: "1px solid white",
            width: "100%",
          }}
        >
          <DragonInfo />
        </section>
        {/* Третя секція: Rocket Statistics */}
        <section
          id="statistics"
          style={{
            height: "146px",
            border: "1px solid white",
          }}
        >
          <RocketStatistics />
        </section>

        {/* Четверта секція */}
        <section
          id="about"
          style={{
            height: "644px",
            border: "1px solid white",
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

            border: "1px solid white",
            position: "absolute",
            width: "1806px",

            left: "calc(50% - (1806px/2))",
            top: "3297px",
          }}
        >
          <StarshipCapabilities />
        </section>
      </div>
      <div></div>
    </>
  );
};

export default Home;
