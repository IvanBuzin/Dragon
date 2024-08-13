import About from "./About";
import DragonInfo from "./DragonInfo/DragonInfo";
import Header from "./Header";
import StarshipCapabilities from "./StarshipCapabilities";
import Team from "./Team";

const Home = () => {
  return (
    <>
      <div
        style={{
          color: "white",
          height: "100%",
          maxHeight: "3149px",
        }}
      >
        {/* Перша секція */}
        <section
          id="rockets"
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
            margin: "0px",
          }}
        >
          <DragonInfo />
        </section>
        {/* Друга секція: Rocket Statistics */}
        <section
          id="rocket-stats"
          style={{
            height: "755px",
            border: "1px solid white",
            // borderRadius: "40px",
          }}
        ></section>
        {/* Третя секція */}
        <section id="about">
          <About />
        </section>
        {/* Четверта секція */}
        <section id="team">
          <Team />
        </section>
      </div>
      <div>
        {/* П'ята секція */}
        <section id="starship">
          <StarshipCapabilities />
        </section>
      </div>
    </>
  );
};

export default Home;
