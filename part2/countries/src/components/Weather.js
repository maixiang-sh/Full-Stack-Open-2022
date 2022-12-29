import axios from "axios";
import { useState, useEffect } from "react";

const Weather = ({commonName, lat, lon}) => {
  const [weather, setWeather] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;
  console.log(commonName, lat, lon);

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://api.openweathermap.org/data/2.5/weather",
      params: {
        lat: lat,
        lon: lon,
        appid: api_key,
      },
    }).then((response) => {
      setWeather(response.data);
      console.log(response.data.weather)
    });
  }, [api_key, lat, lon]);

  return (
    <div>
      <h2>{`Weather in ${commonName}`}</h2>
      <p>{`temperature ${weather.main?.temp} Celcius`}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`}
        alt={`${weather.weather?.description}`}
      />
      <p>{`wind ${weather.wind?.speed} m/s`}</p>
    </div>
  );
};

export default Weather;
