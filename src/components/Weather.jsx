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
<div className="self-center h-[500px] w-[300px] p-2.5 lg:h-[500px] lg:w-[700px] rounded-2xl bg-white/30 backdrop-blur-lg flex flex-col items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
<div className="flex items-center gap-3 mt-5">
<input 
  ref={inputRef} 
  type="text" 
  placeholder="Search" 
  className="h-12 border-none outline-none rounded-full fixed left-4 lg:left-0 lg:right-0  md:pl-6  text-gray-600 bg-[#ebfffc] text-base md:text-lg "
/>
<FaSearch className="text-2xl  z-[1] text-black cursor-pointer transition-colors duration-300 ease-in-out rounded-full hover:text-blue-500 bg-[#ebfffc] w-10 h-8" onClick={()=>search(inputRef.current.value)} />
{/* <img src="search.png" alt="" className="search-icon" /> */}
    </div>
    {weatherData?<>
      <img src={weatherData.icon} alt="" className='w-[120px]' />
    <p className='text-white text-5xl leading-none'>{weatherData.temperature}°C </p>
    <p className='text-white text-[30px]'>{weatherData.location}</p>
    <div className=" text-white text-[20px] flex lg:gap-52 mt-10">
      <div className="flex items-start gap-0.5 text-xl">
        <img className='w-[50px]' src={wave_icon} alt="" />
        <div>
          <p>{weatherData.humidity}%</p>
<span>Humidity</span>
        </div>
      </div>
      <div className="flex items-start gap-0.5 text-xl">
        <img className='w-[50px] ' src={wind_icon} alt="" />
        <div>
          <p>{weatherData.windSpeed}Km/hr</p>
<span>Wind speed</span>
        </div>
      </div>
    </div>
    </>:<></>}
  
    </div>

  )
}

export default Weather