import About from "./About";
import DragonInfo from "./DragonInfo/DragonInfo";
import Header from "./Header";
import RocketStatistics from "./RocketStatistics";
import StarshipCapabilities from "./StarshipCapabilities";
import Team from "./Team";

const Home = () => {
  return (
    <>
      <div
        style={{
          color: "white",
          height: "100%",
          maxHeight: "3983px",
          display: "flex",
          gap: "100px",
          flexDirection: "column",
          // width: "1320px",
          padding: "48px 60px",
        }}
      >
        {/* Перша секція */}
        <section
          id="hero"
          style={{
            height: "653px",
            border: "1px solid white",
            borderRadius: "40px",
          }}
        >
          <Header />
        </section>
        {/* Друга секція */}
        <section
          id="rockets"
          style={{
            height: "755px",
            border: "1px solid white",
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
          }}
        >
          <About />
        </section>
        {/* П'ята секція */}
        <section
          id="team"
          style={{
            height: "551px",
          }}
        >
          <Team />
        </section>
      </div>
      <div>
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
    </>
  );
};

export default Home;
