import { useEffect, useState } from "react";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const localStorageKey = "teamData";

  const saveToLocalStorage = (data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return null;
  };

  const fetchData = () => {
    return fetch("https://api.spacexdata.com/v4/dragons") // замініть на ваш API для отримання даних команди
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTeamMembers(data);
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
      setTeamMembers(cachedData);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#111", color: "#fff" }}>
      <h2>Team</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce auctor
        sed urna a faucibus. Pellentesque mi nisl, mollis convallis metus id,
        congue semper neque. Sed suscipit eget ipsum ut gravida. Fusce 
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {teamMembers.map((member) => (
          <div
            key={member.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              backgroundColor: "#222",
              textAlign: "center",
            }}
          >
            <img
              src={member.photo}
              alt={member.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <h3>{member.name}</h3>
            <p>{member.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
