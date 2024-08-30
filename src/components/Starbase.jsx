import React from "react";

const Starbase = () => {
  return (
    <section
      id="base"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",

        top: "1726px",

        backgroundImage:
          'url("https://www.spacex.com/vehicles/starship/assets/images/Starbase_Desktop.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0px",
        gap: "32px",
      }}
    >
      <div
        style={{
          width: "1321px",
          height: "172px",
          position: "absolute",

          top: "551px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "453px",
            gap: "24px",
          }}
        >
          <h2>STARBASE</h2>
          <p
            style={{
              height: "72px",
              margin: "0px",
              lineHeight: "24px",
            }}
          >
            Development and manufacturing of Starship takes place at Starbase,
            one of the world’s first commercial spaceports designed for orbital
            missions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Starbase;
