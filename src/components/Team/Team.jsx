import { useEffect, useState, useRef, lazy } from "react";
import Slider from "react-slick";
import css from "./Team.module.css";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedMemberId, setExpandedMemberId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0); // Стейт для поточного слайду

  const sliderRef = useRef(null);

  const localStorageKey = "teamData";

  const cacheExpiryTime = 24 * 60 * 60 * 1000; // 24 години

  const isCacheValid = () => {
    const cachedTime = localStorage.getItem("teamDataTimestamp");
    if (!cachedTime) return false;
    const currentTime = new Date().getTime();
    return currentTime - cachedTime < cacheExpiryTime;
  };
  const saveToLocalStorage = (data) => {
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    localStorage.setItem("teamDataTimestamp", new Date().getTime());
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
    return data;
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
            const wikiData = await fetchWikiData(member.name);
            const shortRole = wikiData.extract.includes("NASA astronaut")
              ? "NASA astronaut"
              : "Engineer";
            return {
              ...member,
              image: member.image ?? wikiData.thumbnail?.source, // Використовуємо зображення з Вікіпедії, якщо не знайдено основне зображення
              role: shortRole,
              fullRoleDescription:
                wikiData.extract ?? "No description available",
            };
          })
        );

        // Спочатку завантажуємо основні дані
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
    fetchData();

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        sliderRef.current.slickPrev();
      } else if (event.key === "ArrowRight") {
        sliderRef.current.slickNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleExpandedRole = (id) => {
    setExpandedMemberId((prevId) => (prevId === id ? null : id));
  };
  const handlePrevClick = () => {
    if (currentSlide > 0) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (currentSlide < teamMembers.length - 1) {
      sliderRef.current.slickNext();
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: window.innerWidth < 768 ? 1 : 2,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: "ondemand",
    afterChange: (current) => setCurrentSlide(current), // Update current slide index
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div className="spinner">Loading...</div>;
  }

  if (error) {
    return (
      <p>
        Failed to load team data. Please try again later. Error: {error.message}
      </p>
    );
  }
  return (
    <div className={css.teamContainer}>
      <div className={css.teamFirst}>
        <div className={css.teamFirstContainer}>
          <h2 className={css.teamH2}>Team</h2>
          <p className={css.teamP}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            auctor sed urna a faucibus. Pellentesque mi nisl, mollis convallis
            metus id, congue semper neque. Sed suscipit eget ipsum ut gravida.
            Fusce
          </p>
        </div>

        <div className={css.teamNav}>
          <div
            className={`${css.teamNavNext} ${
              currentSlide === 0 ? "disabled" : ""
            }`}
            onClick={handlePrevClick}
          >
            <img
              className={css.teamNavImg}
              src="/images/Group 1x.png"
              alt="navigation left"
            />
          </div>
          <div
            className={`${css.teamNavNext} ${
              currentSlide === teamMembers.length - 2 ? "disabled" : ""
            }`}
            onClick={handleNextClick}
          >
            <img
              className={css.teamNavImg}
              src="/images/Group 1x r.png"
              alt="navigation r"
            />
          </div>
        </div>
      </div>

      <div className={css.teamSecond} /* 2 блок*/>
        <Slider ref={sliderRef} {...sliderSettings}>
          {teamMembers.map((member) => (
            <div
              className={css.teamSecondContainer}
              key={member.id}
              onClick={() => toggleExpandedRole(member.id)}
            >
              <div className={css.teamSecondBlock}>
                <img
                  className={css.teamSecondImg}
                  src={member.image}
                  alt={member.name}
                  onError={(e) =>
                    (e.target.src =
                      member.wikiImage || "/src/images/image 2.png")
                  }
                />
                <div className={css.teamSecondBlockText}>
                  <p className={css.teamPt}>
                    {expandedMemberId === member.id &&
                    member.fullRoleDescription
                      ? member.fullRoleDescription
                      : member.role}{" "}
                    {/* St. Mechanic */}
                  </p>
                  <h4 className={css.teamH4}>{member.name}</h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Team;
