import { useEffect, useState } from "react";

const DragonInfo = () => {
  const [dragons, setDragons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/dragons")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setDragons(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>dive deep in to the future</h1>
      <h2>Our rockets</h2>
      {dragons.map((dragon) => (
        <div
          key={dragon.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            width: "427px",
            display: "flex",
            flexWrap: "wrap",
            color: "white",
            flexDirection: "column",
          }}
        >
          <img
            src={dragon.flickr_images[0]}
            alt={dragon.name}
            style={{ width: "379px", height: "219px" }}
          />
          <h3>{dragon.name}</h3>
          <p>
            <strong>Description:</strong> {dragon.description}
          </p>
          <p>
            <strong>First Flight:</strong> {dragon.first_flight}
          </p>
          <p>
            <strong>Type:</strong> {dragon.type}
          </p>
          <p>
            <strong>Crew Capacity:</strong> {dragon.crew_capacity}
          </p>
          <p>
            <strong>Dry Mass (kg):</strong> {dragon.dry_mass_kg}
          </p>
          <p>
            <strong>Dry Diameter (m):</strong> {dragon.dru_diameter_m}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DragonInfo;
