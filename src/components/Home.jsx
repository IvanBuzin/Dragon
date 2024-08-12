import About from "./About";
import DragonInfo from "./DragonInfo/DragonInfo";
import StarshipCapabilities from "./StarshipCapabilities";
import Team from "./Team";

const Home = () => {
  return (
    <div style={{ color: "white", backgroundColor: "#111", padding: "20px" }}>
      {/* Перша секція */}
      <section id="rockets">
        <DragonInfo />
      </section>

      {/* Друга секція: Rocket Statistics */}
      <section id="rocket-stats" style={{ marginTop: "50px" }}>
        <h2>Rocket Statistics</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: "30%",
              padding: "20px",
              backgroundColor: "#222",
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <h2>209</h2>
            <h3>Total Launches</h3>
          </div>

          <div
            style={{
              width: "30%",
              padding: "20px",
              backgroundColor: "#222",
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <h2>23</h2>
            <h3>Visits to the ISS</h3>
          </div>

          <div
            style={{
              width: "30%",
              padding: "20px",
              backgroundColor: "#222",
              textAlign: "center",
              borderRadius: "8px",
            }}
          >
            <h2>31</h2>
            <h3>Total Reflights</h3>
          </div>
        </div>
      </section>
      {/* Третя секція */}
      <section id="about">
        <About />
      </section>
      {/* Четверта секція */}
      <section id="team">
        <Team />
      </section>

      {/* П'ята секція */}
      <section id="starship">
        <StarshipCapabilities />
      </section>
    </div>
  );
};

export default Home;
