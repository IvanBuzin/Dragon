import React from "react";
import css from "./Starbase.module.css";

const Starbase = () => {
  return (
    <section className={css.baseContent} id="base">
      <div className={css.baseBlock}>
        <h2 className={css.baseH2}>STARBASE</h2>
        <p className={css.baseP}>
          Development and manufacturing of Starship takes place at Starbase, one
          of the world’s first commercial spaceports designed for orbital
          missions.
        </p>
      </div>
    </section>
  );
};

export default Starbase;
