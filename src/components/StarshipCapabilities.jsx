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

// import { useState, useEffect, useRef } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "./StarshipCapabilities.css"; // Підключаємо файл CSS для стилів

// const fetchRocketData = (rocketType) => {
//   const apiUrl = {
//     starship: "https://api.spacexdata.com/v4/rockets",
//     falcon: "https://api.spacexdata.com/v4/rockets",
//     dragon: "https://api.spacexdata.com/v4/dragons",
//   }[rocketType];

//   return fetch(apiUrl)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       // Фільтрація даних для Starship
//       if (rocketType === "starship") {
//         return data.filter((item) =>
//           item.name.toLowerCase().includes("starship")
//         );
//       }
//       return data.filter((item) => item.flickr_images); // Відфільтрувати елементи без зображень
//     })
//     .catch((error) => {
//       throw error;
//     });
// };

// const StarshipCapabilities = () => {
//   const [capabilities, setCapabilities] = useState([]);
//   const [activeSlide, setActiveSlide] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedRocket, setSelectedRocket] = useState("starship");
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     setLoading(true);
//     fetchRocketData(selectedRocket)
//       .then((data) => {
//         setCapabilities(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setError(error);
//         setLoading(false);
//       });
//   }, [selectedRocket]);

//   const handlePrev = () => {
//     sliderRef.current.slickPrev();
//   };

//   const handleNext = () => {
//     sliderRef.current.slickNext();
//   };

//   const handleRocketChange = (e) => {
//     setSelectedRocket(e.target.value);
//   };

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     beforeChange: (oldIndex, newIndex) => setActiveSlide(newIndex),
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div className="starship-capabilities-container">
//       <div className="rocket-selector">
//         <select value={selectedRocket} onChange={handleRocketChange}>
//           <option value="dragon">Dragon</option>
//           <option value="starship">Starship</option>
//           <option value="falcon">Falcon </option>
//         </select>
//       </div>

//       <div className="slider-container">
//         <Slider {...settings} ref={sliderRef}>
//           {capabilities.map((capability, index) => (
//             <div
//               key={index}
//               className="slider-item"
//               style={{ display: "flex", height: "700px" }}
//             >
//               <div style={{ display: "flex", height: "500px", gap: "40px" }}>
//                 {capability.flickr_images.length > 0 ? (
//                   capability.flickr_images.map((image, imgIndex) => (
//                     <img
//                       key={imgIndex}
//                       src={image}
//                       alt={`Image of ${capability.name}`}
//                       className="slider-image"
//                     />
//                   ))
//                 ) : (
//                   <p>No images available</p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </Slider>

//         <div className="navigation-container">
//           <img
//             className="arrow"
//             src="/src/images/Vector w.png"
//             alt="navigation left"
//             onClick={handlePrev}
//           />
//           <div className="dots-container">
//             {capabilities.map((_, index) => (
//               <div
//                 key={index}
//                 className={`dot ${index === activeSlide ? "active" : ""}`}
//                 onClick={() => sliderRef.current.slickGoTo(index)}
//               ></div>
//             ))}
//           </div>
//           <img
//             className="arrow"
//             src="/src/images/Vector w r.png"
//             alt="navigation right"
//             onClick={handleNext}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StarshipCapabilities;

// /* Frame 1000007918 */

// position: absolute;
// width: 1806px;
// height: 834px;
// left: calc(50% - 1806px/2);
// top: 3297px;

// /* download (10) 1 */

// position: absolute;
// width: 1806px;
// height: 834px;
// left: calc(50% - 1806px/2);
// top: 0px;

// background: url(download (10).jpg);

// /* Frame 1000007915 */

// /* Auto layout */
// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 0px;
// gap: 32px;

// position: absolute;
// width: 1321px;
// height: 366px;
// left: 243px;
// top: 436px;

// /* Frame 1000007907 */

// /* Auto layout */
// display: flex;
// flex-direction: column;
// align-items: flex-start;
// padding: 0px;
// gap: 24px;

// width: 453px;
// height: 272px;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

// /* STARSHIP CAPABILITIES */

// width: 468px;
// height: 152px;

// font-family: 'Rubik';
// font-style: normal;
// font-weight: 700;
// font-size: 64px;
// line-height: 76px;
// text-transform: uppercase;

// color: #FFFFFF;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

// /* As the most powerful launch system ever developed, Starship will be able to carry up to 100 people on long-duration, interplanetary flights. Starship will also help enable satellite delivery, the development of a Moon base, and point-to-point transport here on Earth. */

// width: 453px;
// height: 96px;

// font-family: 'Rubik';
// font-style: normal;
// font-weight: 400;
// font-size: 14px;
// line-height: 24px;
// /* or 171% */

// color: #FFFFFF;

// /* Inside auto layout */
// flex: none;
// order: 1;
// align-self: stretch;
// flex-grow: 0;

// /* Frame 1000007909 */

// /* Auto layout */
// display: flex;
// flex-direction: row;
// justify-content: space-between;
// align-items: center;
// padding: 0px;
// gap: 12px;

// width: 1321px;
// height: 62px;

// /* Inside auto layout */
// flex: none;
// order: 1;
// align-self: stretch;
// flex-grow: 0;

// /* mingcute:arrow-up-line */

// margin: 0 auto;
// width: 62px;
// height: 62px;

// border-radius: 12px;
// transform: matrix(0, 1, 1, 0, 0, 0);

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

// /* Group */

// position: absolute;
// width: 38.25px;
// height: 38.75px;
// left: 11.25px;
// top: 12.5px;

// transform: matrix(0, 1, 1, 0, 0, 0);

// /* Vector */

// position: absolute;
// left: 18.15%;
// right: 20.16%;
// top: 20.16%;
// bottom: 17.34%;

// transform: matrix(0, 1, 1, 0, 0, 0);

// /* Vector */

// position: absolute;
// left: 26.85%;
// right: 38.92%;
// top: 33.87%;
// bottom: 20.15%;

// background: #FFFFFF;
// transform: matrix(0, 1, 1, 0, 0, 0);

// /* Frame 1000007914 */

// /* Auto layout */
// display: flex;
// flex-direction: row;
// justify-content: center;
// align-items: center;
// padding: 0px;
// gap: 12px;

// margin: 0 auto;
// width: 128px;
// height: 16px;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;

// /* Ellipse 1 */

// width: 16px;
// height: 16px;

// background: #FFFFFF;

// /* Inside auto layout */
// flex: none;
// order: 0;
// flex-grow: 0;

// /* Ellipse 2 */

// width: 16px;
// height: 16px;

// background: #FFFFFF;
// opacity: 0.4;

// /* Inside auto layout */
// flex: none;
// order: 1;
// flex-grow: 0;

// /* Ellipse 3 */

// width: 16px;
// height: 16px;

// background: #FFFFFF;
// opacity: 0.4;

// /* Inside auto layout */
// flex: none;
// order: 2;
// flex-grow: 0;

// /* Ellipse 4 */

// width: 16px;
// height: 16px;

// background: #FFFFFF;
// opacity: 0.4;

// /* Inside auto layout */
// flex: none;
// order: 3;
// flex-grow: 0;

// /* Ellipse 5 */

// width: 16px;
// height: 16px;

// background: #FFFFFF;
// opacity: 0.4;

// /* Inside auto layout */
// flex: none;
// order: 4;
// flex-grow: 0;

// /* mingcute:arrow-up-line */

// margin: 0 auto;
// width: 62px;
// height: 62px;

// border-radius: 12px;
// transform: rotate(90deg);

// /* Inside auto layout */
// flex: none;
// order: 2;
// flex-grow: 0;

// /* Group */

// position: absolute;
// width: 38.25px;
// height: 38.75px;
// left: 50.75px;
// top: 12.5px;

// transform: rotate(90deg);

// /* Vector */

// position: absolute;
// left: 81.85%;
// right: -43.55%;
// top: 20.16%;
// bottom: 17.34%;

// transform: rotate(90deg);

// /* Vector */

// position: absolute;
// left: 73.15%;
// right: -7.38%;
// top: 33.87%;
// bottom: 20.15%;

// background: #FFFFFF;
// transform: rotate(90deg);
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./StarshipCapabilities.css";

const fetchRocketData = (rocketType) => {
  const apiUrl = {
    starship: "https://api.spacexdata.com/v4/rockets",
    falcon: "https://api.spacexdata.com/v4/rockets",
    dragon: "https://api.spacexdata.com/v4/dragons",
  }[rocketType];

  return fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (rocketType === "starship") {
        return data.filter((item) =>
          item.name.toLowerCase().includes("starship")
        );
      }
      return data.filter((item) => item.flickr_images);
    })
    .catch((error) => {
      throw error;
    });
};

const StarshipCapabilities = () => {
  const [capabilities, setCapabilities] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRocket, setSelectedRocket] = useState("starship");
  const sliderRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    fetchRocketData(selectedRocket)
      .then((data) => {
        setCapabilities(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [selectedRocket]);

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handleRocketChange = (e) => {
    setSelectedRocket(e.target.value);
    setActiveSlide(0); // Скидаємо слайд після вибору іншої ракети
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setActiveSlide(newIndex),
    lazyLoad: "ondemand", // Додаємо Lazy Loading
    arrows: false, // Відключаємо вбудовані стрілки
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="starship-capabilities-container">
      {/* Ракетний селектор */}
      <div className="rocket-selector">
        <select value={selectedRocket} onChange={handleRocketChange}>
          <option value="dragon">Dragon</option>
          <option value="starship">Starship</option>
          <option value="falcon">Falcon</option>
        </select>
      </div>

      {/* Слайдер зображень */}
      <div className="slider-container">
        <Slider {...settings} ref={sliderRef}>
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="slider-item"
              style={{ display: "flex", height: "700px" }}
            >
              <div style={{ display: "flex", height: "770px", gap: "40px" }}>
                {capability.flickr_images.length > 0 ? (
                  capability.flickr_images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`Image of ${capability.name}`}
                      className="slider-image"
                      loading="lazy" // Додаємо Lazy Loading для зображень
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </div>
          ))}
        </Slider>

        {/* Навігація */}
        <div className="navigation-container">
          <button
            className={`arrow ${activeSlide === 0 ? "disabled" : ""}`}
            onClick={handlePrev}
            disabled={activeSlide === 0}
          >
            <img
              className="arrow-icon"
              src="/src/images/Vector w.png"
              alt="Previous"
            />
          </button>

          <div className="dots-container">
            {capabilities.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === activeSlide ? "active" : ""}`}
                onClick={() => sliderRef.current.slickGoTo(index)}
              ></div>
            ))}
          </div>

          <button
            className={`arrow ${
              activeSlide === capabilities.length - 1 ? "disabled" : ""
            }`}
            onClick={handleNext}
            disabled={activeSlide === capabilities.length - 1}
          >
            <img
              className="arrow-icon"
              src="/src/images/Vector w r.png"
              alt="Next"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StarshipCapabilities;
