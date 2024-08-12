import { useEffect, useState } from "react";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функція для завантаження даних з API
  // const fetchData = () => {
  //   return fetch("https://api.spacexdata.com/v4/dragons")
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setAboutData(data);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //     });
  // };

  // Функція для завантаження даних (імітація API виклику)
  const fetchData = () => {
    // Імітуємо затримку завантаження даних
    setTimeout(() => {
      const data = {
        // description: "",
        video_url: "https://www.youtube.com/embed/L-CfAaqL-4g",
      };
      setAboutData(data);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>About Us</h2>
      <p>{aboutData.description}</p>
      {aboutData.video_url && (
        <div
          style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
        >
          <iframe
            src={aboutData.video_url}
            title="About Us Video"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default About;
