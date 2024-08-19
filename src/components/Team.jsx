import { useEffect, useState, useRef } from "react";
import Slider from "react-slick";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMemberId, setExpandedMemberId] = useState(null);

  const sliderRef = useRef(null);

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

  const fetchWikiData = async (name) => {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        name
      )}`
    );
    const data = await response.json();
    return data.extract; // Витягує короткий опис з Вікіпедії
  };

  const fetchData = () => {
    return fetch("https://api.spacexdata.com/v4/crew")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(async (data) => {
        // Додаємо короткий опис з Вікіпедії до кожного члена команди
        const teamDataWithRoles = await Promise.all(
          data.map(async (member) => {
            const roleDescription = await fetchWikiData(member.name);
            const shortRole = roleDescription.split(" ").slice(0, 2).join("");
            return {
              ...member,
              role: shortRole,
              fullRoleDescription: roleDescription,
            };
          })
        );

        setTeamMembers(teamDataWithRoles);
        saveToLocalStorage(teamDataWithRoles);
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

    fetchData().then((data) => console.log(data));
  }, []);

  const toggleExpandedRole = (id) => {
    setExpandedMemberId((prevId) => (prevId === id ? null : id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  /*перевірити*/
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px" /*загальний блок вертикаль*/,
      }}
    >
      <div
        style={{
          display: "flex",
          backgroundColor: "#111",
          color: "#fff",
          flexDirection: "column",
          height: "551px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "24px",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "427px",
            height: "196px",
          }}
        >
          <h2>Team</h2>
          <p style={{ margin: "0px", lineHeight: "24px" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            auctor sed urna a faucibus. Pellentesque mi nisl, mollis convallis
            metus id, congue semper neque. Sed suscipit eget ipsum ut gravida.
            Fusce 
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <div
            style={{
              background: "#fff",
              width: "126px",
              height: "126px",
              borderRadius: "24px",
            }}
            onClick={() => sliderRef.current.slickPrev()}
          >
            <img
              src="/src/images/Group 1x.png"
              alt="navigation left"
              style={{ marginLeft: "24px", marginTop: "24px" }}
            />
          </div>
          <div
            style={{
              width: "126px",
              height: "126px",
              borderRadius: "24px",
              background: "#fff",
            }}
            onClick={() => sliderRef.current.slickNext()}
          >
            <img
              src="/src/images/Group 1x r.png"
              alt="navigation r"
              style={{ marginLeft: "24px", marginTop: "24px" }}
            />
          </div>
        </div>
      </div>

      <div /* 2 блок*/
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          width: "70%",
          flexDirection: "column",
        }}
      >
        <Slider ref={sliderRef} {...sliderSettings}>
          {teamMembers.map((member) => (
            <div
              key={member.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "32px 0px",
                gap: "12px",
                width: "423px",
                height: "551px",
                border: "1px solid #ccc",
                borderRadius: "40px",
                boxSizing: "border-box",

                flex: "none",
                order: 1,
                flexGrow: 0,

                backgroundColor: "#222",

                position: "relative",
              }}
              onClick={() => toggleExpandedRole(member.id)}
            >
              <img
                src={member.image}
                alt={member.name}
                style={{
                  height: "423px",
                  maxWidth: "423px",
                  borderRadius: "40px",
                  objectFit: "cover",
                  textAlign: "center",
                }}
              />

              <p
                style={{
                  textTransform: "uppercase",
                  fontSize: "12px",
                  margin: "0",
                }}
              >
                {expandedMemberId === member.id
                  ? member.fullRoleDescription
                  : member.role}
              </p>
              <h4 style={{ fontSize: "14px", margin: "0" }}>{member.name}</h4>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Team;
