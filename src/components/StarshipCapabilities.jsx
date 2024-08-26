// import { useState, useEffect, useRef } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const StarshipCapabilities = () => {
//   const [capabilities, setCapabilities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const sliderRef = useRef(null); // Додано useRef для керування навігацією
//   const localStorageKey = "capabilitiesData";

//   const saveToLocalStorage = (data) => {
//     localStorage.setItem(localStorageKey, JSON.stringify(data));
//   };

//   const loadFromLocalStorage = () => {
//     const savedData = localStorage.getItem(localStorageKey);
//     if (savedData) {
//       return JSON.parse(savedData);
//     }
//     return null;
//   };

//   const fetchData = () => {
//     return fetch("https://api.spacexdata.com/v4/dragons") // замініть на ваш API для отримання даних про можливості Starship
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setCapabilities(data);
//         saveToLocalStorage(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     const cachedData = loadFromLocalStorage();

//     if (cachedData) {
//       setCapabilities(cachedData);
//       setLoading(false);
//     } else {
//       fetchData();
//     }
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false,
//   };

//   return (
//     <div
//       style={{
//         // display: "flex",

//         // flexDirection: "column",

//         WebkitFontSmoothing: "antialiased",
//         font: "16px/24px Arial, Verdana, sans-serif",
//         fontWeight: 400,
//         fontStyle: "normal",
//         textAlign: "center",
//         overflow: "hidden",
//         display: "block",
//         position: "absolute",
//         width: "100%",
//         height: "100%",
//         margin: 0,
//         padding: 0,
//         backgroundColor: "#000",
//         backgroundPosition: "center center",
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         transform:
//           "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotate3d(0, 0, 0.75, 0deg)",
//         backgroundImage:
//           'url("https://www.spacex.com/vehicles/starship/assets/images/Starhip_website-crop20230126_dji_0199_01.jpg")',
//         opacity: 1,
//         visibility: "inherit",
//       }}
//     >
//       <Slider {...settings} ref={sliderRef}>
//         {capabilities.map((capability, index) => (
//           <div
//             key={index}
//             style={{
//               textAlign: "center",
//               display: "flex",
//               // alignItems: "center",
//               // justifyContent: "center",
//               // flexDirection: "column",
//             }}
//           >
//             <img
//               src={capability.flickr_images[0]}
//               alt={capability.name}
//               style={{
//                 width: "100%",
//                 maxHeight: "834px",
//                 objectFit: "cover",
//               }}
//             />{" "}
//             <h3>{capability.name}</h3>
//             {/*
//             <p>
//               <strong>Description:</strong>
//               {capability.description}
//             </p>
//             <p>
//               <strong>First Flight:</strong>
//               {capability.first_flight}
//             </p>
//             <p>
//               <strong>Active:</strong>
//               {capability.active ? "Yes" : "No"}
//             </p>
//             <p>
//               <strong>Crew Capacity:</strong>
//               {capability.crew_capacity}
//             </p>
//             <p>
//               <strong>Height:</strong> {capability.height_w_trunk.meters} meters
//               / {capability.height_w_trunk.feet} feet
//             </p>
//             <p>
//               <strong>Diameter:</strong> {capability.diameter.meters} meters /{" "}
//               {capability.diameter.feet} feet
//             </p>
//             <p>
//               <strong>Launch Payload Mass:</strong>{" "}
//               {capability.launch_payload_mass.kg} kg /{" "}
//               {capability.launch_payload_mass.lb} lbs
//             </p> */}
//             <div
//               style={{
//                 flexDirection: "column",
//                 marginLeft: "60px",
//                 justifyContent: "space-between",

//                 // marginTop: "-360px",
//                 display: "flex",

//                 alignItems: "flex-start",
//                 padding: "0px",
//                 gap: "32px",
//                 position: "absolute",
//                 width: "1321px",
//                 height: "366px",
//                 left: "243px",
//                 top: "436px",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "flex-start",
//                   width: "453px",
//                   gap: "24px",
//                 }}
//               >
//                 <h2 style={{}}>Starship Capabilities</h2>{" "}
//                 <p style={{ width: "453px", margin: "0px" }}>
//                   As the most powerful launch system ever developed, Starship
//                   will be able to carry up to 100 people on long-duration,
//                   interplanetary flights. Starship will also help enable
//                   satellite delivery, the development of a Moon base, and
//                   point-to-point transport here on Earth.
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default StarshipCapabilities;

import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./StarshipCapabilities.css"; // Підключаємо файл CSS для стилів

const StarshipCapabilities = () => {
  const [capabilities, setCapabilities] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const localStorageKey = "capabilitiesData";

  const saveToLocalStorage = (data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(localStorageKey);
    return savedData ? JSON.parse(savedData) : null;
  };

  const fetchData = () => {
    return fetch("https://api.spacexdata.com/v4/dragons")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCapabilities(data);
        saveToLocalStorage(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    const cachedData = loadFromLocalStorage();
    if (cachedData) {
      setCapabilities(cachedData);
      setLoading(false);
    } else {
      fetchData();
    }
  }, []);

  const handlePrev = () => {
    sliderRef.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setActiveSlide(newIndex),
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div
      style={{
        // display: "flex",

        // flexDirection: "column",

        WebkitFontSmoothing: "antialiased",
        font: "16px/24px Arial, Verdana, sans-serif",
        fontWeight: 400,
        fontStyle: "normal",
        textAlign: "center",
        overflow: "hidden",
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        backgroundColor: "#000",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transform:
          "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotate3d(0, 0, 0.75, 0deg)",
        backgroundImage:
          'url("https://www.spacex.com/vehicles/starship/assets/images/Starhip_website-crop20230126_dji_0199_01.jpg")',
        opacity: 1,
        visibility: "inherit",
      }}
    >
      <div className="slider-container">
        <Slider {...settings} ref={sliderRef}>
          {capabilities.map((capability, index) => (
            <div key={index} className="slider-item">
              <img
                src={capability.flickr_images[index + 1]}
                alt={capability.name}
                className="slider-image"
              />
              {/* <h3>{capability.name}</h3>
            <div className="capability-description">
              <p>
                <strong>Description:</strong> {capability.description}
              </p>
              <p>
                <strong>First Flight:</strong> {capability.first_flight}
              </p>
              <p>
                <strong>Active:</strong> {capability.active ? "Yes" : "No"}
              </p>
              <p>
                <strong>Crew Capacity:</strong> {capability.crew_capacity}
              </p>
              <p>
                <strong>Height:</strong> {capability.height_w_trunk.meters}{" "}
                meters / {capability.height_w_trunk.feet} feet
              </p>
              <p>
                <strong>Diameter:</strong> {capability.diameter.meters} meters /{" "}
                {capability.diameter.feet} feet
              </p>
              <p>
                <strong>Launch Payload Mass:</strong>{" "}
                {capability.launch_payload_mass.kg} kg /{" "}
                {capability.launch_payload_mass.lb} lbs
              </p>
            </div> */}
            </div>
          ))}
        </Slider>
        <div className="navigation-container">
          <img
            className="arrow"
            src="/src/images/Vector w.png"
            alt="navigation left"
            onClick={handlePrev}
          />
          <div className="dots-container">
            {capabilities.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === activeSlide ? "active" : ""}`}
                onClick={() => sliderRef.current.slickGoTo(index)}
              ></div>
            ))}
          </div>
          <img
            className="arrow"
            src="/src/images/Vector w r.png"
            alt="navigation right"
            onClick={handleNext}
          />
        </div>
      </div>
      /
    </div>
  );
};

export default StarshipCapabilities;
