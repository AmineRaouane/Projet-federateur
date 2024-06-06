import "./Classes.css";
import React, { useState, useEffect } from "react";
import api from "../../api";
import ImagesList from "./imageslist";

const Classes = () => {
  const [partners, setPartners] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    getPartners();
  }, []);

  const getPartners = () => {
    api
      .get("/api/partners/List/")
      .then((res) => {
        const partnersData = res.data;
        setPartners(partnersData);
        if (partnersData.length > 0) {
          setSelectedCity(partnersData[0].city);
        }
      })
      .catch((err) => alert(err));
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  return (
    <div className="classes-wrapper">
      <section className="contact-banner banner">
        <div className="container center">
          <div className="banner-heading">
            <h1>Partners</h1>
          </div>
        </div>
      </section>

      <section className="class-timings center py-5 my-5">
        <div className="container center flex-col">
          <div className="title">
            <h4
              className="text-lg uppercase font-bold"
              style={{ color: "orangered" }}
            >
              IN PROGRAM
            </h4>
          </div>
          <div className="heading text-4xl uppercase font-bold mb-4 p-1">
            Gyms available
          </div>

          <nav className="weekbar rounded mb-5">
            <ul className="week-list center flex-wrap">
              {partners.map((item) => (
                <li
                  key={item.id}
                  className={`list-item mx-1 ${
                    selectedCity === item.city ? "active" : ""
                  }`}
                  onClick={() => handleCityClick(item.city)}
                >
                  {item.city}
                </li>
              ))}
            </ul>
          </nav>

          {selectedCity && (
            <div className="time-table center flex-wrap">
              {partners
                .find((item) => item.city === selectedCity)
                ?.items.map((gym) => (
                  <div
                    style={{
                      backgroundImage: `url(${
                        ImagesList[Math.floor(Math.random() * 15)]
                      })`,
                      backgroundSize: "cover",
                    }}
                    className="class-col center flex-col group"
                    key={gym.name}
                  >
                    <div className="gym-name">{gym.name}</div>
                    <a
                      href={gym.Location_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold uppercase group-hover:text-black"
                      style={{ color: "orangered", textDecoration: "none" }}
                    >
                      go see Location here
                    </a>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Classes;
