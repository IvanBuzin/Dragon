import { useEffect, useState } from "react";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoUrls, setVideoUrls] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const fetchData = async () => {
    try {
      const response = await fetch("https://api.spacexdata.com/v4/launches");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const youtube_ids = data
        .map((launch) => launch.links?.youtube_id)
        .filter((id) => id);
      const webcasts = data
        .map((launch) => launch.links?.webcast)
        .filter((url) => url);

      const urls =
        youtube_ids.length > 0
          ? youtube_ids.map((id) => `https://www.youtube.com/embed/${id}`)
          : webcasts.length > 0
          ? webcasts
          : ["https://www.youtube.com/watch?v=921VbEMAwwY"];

      setVideoUrls(urls);
      setAboutData({ video_url: urls[0] });
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleVideoError = () => {
    const nextIndex = currentVideoIndex + 1;
    if (nextIndex < videoUrls.length) {
      setCurrentVideoIndex(nextIndex);
      setAboutData({ video_url: videoUrls[nextIndex] });
    } else {
      setAboutData({
        video_url: "https://www.youtube.com/watch?v=921VbEMAwwY",
      });
    }
  };

  const handleEscKey = (event) => {
    if (event.key === "Escape") {
      // Повернення на сайт (наприклад, до початкового стану компонента)
      setAboutData({ video_url: videoUrls[0] });
    }
  };

  useEffect(() => {
    fetchData();
    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [currentVideoIndex]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <p>Завантаження відео...</p>
        <div className="spinner"></div> {/* Додайте CSS для спінера */}
      </div>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <h2 style={{ textAlign: "center" }}>About Us</h2>
      {aboutData.video_url && (
        <div
          style={{
            position: "relative",
            paddingBottom: "40.5%",
            height: 0 /*264px*/,
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
            onError={handleVideoError}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default About;
