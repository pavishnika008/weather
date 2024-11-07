import React, { useEffect, useRef, useState } from 'react'
import '../App.css'
import search_icon from '../search-icon.jpg'
import cloudy1_icon from '../cloudy (1).jpg'
import cloudy2_icon from '../cloudy (2).png'
import cloudy_icon from '../cloudy.png'
import heavyrain_icon from '../heavy-rain.png'
import snow_icon from '../snow.png'
import sun_icon from '../sun.png'
import water_icon from '../water.png'
import weather_icon from '../weather.png'
import humidity_icon from '../humidity.png'

export default function Weather() {

  const inputRef= useRef()
  const [weatherData,setWeatherData]=useState(false);
  const allIcons={
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy1_icon,
    "03n": cloudy1_icon,
    "04d": cloudy2_icon,
    "04n": cloudy2_icon,
    "09d": heavyrain_icon,
    "09n": heavyrain_icon,
    "10d": snow_icon,
    "10n": snow_icon,
  }

  const search = async (city)=>{
    if(city === ""){
      alert("Enter City Name!!");
      return;
    }
      try {
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

        const response=await fetch(url);
        const data=await response.json();

        if(!response.ok){
          alert(data.message);
          return;
        }

        console.log(data);
        
        const icon=allIcons[data.weather[0].icon] || sun_icon;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          temperature: Math.floor(data.main.temp - 273.15),
          location: data.name, 
          icon: icon
        })
      } catch (error) {
        setWeatherData(false);
        console.error("Error in fetching weather data");
        
      }
  }
  useEffect(()=>{
    search("Newyork");
  },[])



  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='search'/>
            <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData?<>
          <img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°c</p>
        <p className='location'>{weatherData.location}</p>
        <div className='weather-data'>
          <div className="col">
            <img src={water_icon} alt="" />
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={humidity_icon} alt="" />
            <div>
              <p>{weatherData.windSpeed} Km/h</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
        </>:<></>}
        
    </div>
  )
}
