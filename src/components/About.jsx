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
        // video_url: "https://www.youtube.com/embed/921VbEMAwwY",
        video_url: "https://www.youtube.com/embed/RfiQYRn7fBg",
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
    <div style={{ display: "flex", gap: "32px", flexDirection: "column" }}>
      <h2 style={{ textAlign: "center" }}>About Us</h2>
      {aboutData.video_url && (
        <div
          style={{
            position: "relative",
            paddingBottom: "40.5%",
            height: 0,
          }}
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
              borderRadius: "40px",
              border: "1px solid rgb(204, 204, 204, 0.2)",
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
