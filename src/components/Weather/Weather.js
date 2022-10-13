import React, { useState } from "react";
import "./Weather.css";
import Cities from "../Cities.json";
const Weather = () => {
  const [cities, setCities] = useState("");
  const [citydatas, setCitydatas] = useState({});

  const citiesdata = (e) => {
    setCities(e.target.value);
  };

  const callweatherapi = (e) => {
    console.log(e.target);
    let city = cities;
    console.log(cities.value);
    let base_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5e18bab20cfee42d55a98558d4c0b08a`;
    fetch(base_url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCitydatas({
          uname: data.name,
          temp: Math.floor(data.main.temp - 273),
          country: data.sys.country,
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
        });
      })
      .catch((err) => console.log(err));
    setCities("");
  };
  var iconurl = `http://openweathermap.org/img/wn/${citydatas.icon}.png`;

  return (
    <div>
      <h3 className="loc">Location</h3>
      <div className="box">
        <input
          type="text"
          placeholder="Enter City Name"
          className="input"
          onChange={citiesdata}
        />
        {cities !== "" && (
          <div className="show">
            {Cities.filter((val) => {
              if (cities === "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(cities.toLowerCase())
              ) {
                return val;
              }
            }).map((city, i) => {
              return (
                <div key={i} onClick={callweatherapi}>
                  {" "}
                  {city.name}{" "}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-body">
          {citydatas.uname !== undefined ? (
            <h4 className="card-title">CityName: <span>{citydatas.uname}</span></h4>
          ) : (
            <h5 className="card-title"></h5>
          )}
          {citydatas.temp !== undefined ? (
          <h4>Temperature: <span>{Math.floor(Math.floor(citydatas.temp))}</span></h4>
          ):(
            <h4>No City Selected</h4>
          )}
          {citydatas.desc !== undefined ? (
            <h4>Desc: <span>{citydatas.desc}</span></h4>
          ):(
            <h4></h4>
          )}
          {citydatas.temp !== undefined ? (
            <h4>Country: <span>{citydatas.country}</span></h4>
          ):(
            <h4></h4>
          )}
          <div id="icon">
            <img id="iconurl" src={iconurl} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
