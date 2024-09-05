import React from "react";

const Starbase = () => {
  return (
    <section
      id="base"
      style={{
        width: "100%",
        height: "866px",
        left: "-170px",
        top: "1726px",
        backgroundImage:
          'url("https://www.spacex.com/vehicles/starship/assets/images/Starbase_Desktop.jpg" )',
        backgroundSize: "1440px 866px",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0px",
        gap: "32px",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "1321px",
          height: "172px",
          left: "60px",
          top: "2388px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          padding: "0px",
          gap: "24px",
        }}
      >
        <h2
          style={{
            width: "468px",
            height: "76px",
            fontFamily: "'Rubik', sans-serif",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "64px",
            lineHeight: "76px",
            textTransform: "uppercase",
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          STARBASE
        </h2>
        <p
          style={{
            width: "453px",
            height: "72px",
            fontFamily: "'Rubik', sans-serif",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: "24px",
            color: "#FFFFFF",
            margin: 0,
          }}
        >
          Development and manufacturing of Starship takes place at Starbase, one
          of the world’s first commercial spaceports designed for orbital
          missions.
        </p>
      </div>
    </section>
  );
};

export default Starbase;
