import React, { useRef, useState } from 'react'
import './weather.css'
import wind_icon from '../assets/Wind.png'
import wave_icon from '../assets/wave.png'
import clear_icon from '../assets/sun.png'
import snow_icon from '../assets/snowflake.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rainy.png'
import cloud_icon from '../assets/cloud.png'


import { FaSearch } from "react-icons/fa";
import { useEffect } from 'react';
const Weather = () => {
  const inputRef = useRef()
const [weatherData, setWeatherData] =useState(false)

const allIcons={
  "01d": clear_icon,
  "01n": clear_icon,
  "02d": cloud_icon,
  "02n": cloud_icon,
  "03d": cloud_icon,
  "03n": cloud_icon,
  "04d": drizzle_icon,
  "04n": drizzle_icon,
  "09d": rain_icon,
  "09n": rain_icon,
  "10d": rain_icon,
  "10n": rain_icon,
  "13d": snow_icon,
  "13n": snow_icon,
}
  const search = async (city)=>{
    if(city=== ""){
      alert('Enter city name')
      return;
    }
    try{
const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}
`
 const response = await fetch(url);
const data = await response.json();

if(!response.ok){
  alert(data.message);
  return;
}
console.log(data);
const icon = allIcons[data.weather[0].icon] || clear_icon;
setWeatherData({
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  temperature: Math.floor( data.main.temp),
  location: data.name,
  icon:  icon
})
}
    catch(error){
      setWeatherData(false);
      console.error("Error in fetching weather data")
      // alert("City not found")
      return;
    }
  }
  useEffect(()=>{
  search("Lagos")
  },[])
  
  
  return (
<div className="weather h-[500px] w-full max-w-[800px] md:h-[600px] md:w-[90%] sm:h-[700px] sm:w-[95%] mx-auto">
<div className="search-bar">
<input ref={inputRef} type="text" placeholder='Search' />
<FaSearch className="search-icon" onClick={()=>search(inputRef.current.value)} />
{/* <img src="search.png" alt="" className="search-icon" /> */}
    </div>
    {weatherData?<>
      <img src={weatherData.icon} alt="" className='weather-icon' />
    <p className='temperature'>{weatherData.temperature}°C </p>
    <p className='location'>{weatherData.location}</p>
    <div className="weather-data text-white flex lg:gap-40 mt-10">
      <div className="col">
        <img className='wind' src={wave_icon} alt="" />
        <div>
          <p>{weatherData.humidity} %</p>
<span>Humidity</span>
        </div>
      </div>
      <div className="col">
        <img className='wind ' src={wind_icon} alt="" />
        <div>
          <p>{weatherData.windSpeed} Km/hr</p>
<span>Wind speed</span>
        </div>
      </div>
    </div>
    </>:<></>}
  
    </div>

  )
}

export default Weather