
import React, { useRef, useState } from 'react';
import './Styles.css';
import WeatherCard from './WeatherCard';

function Weather(props) {
    const API_key = "e75b39b56e354740aa3102619211504";
    const REQUESTED_URL = 'https://api.weatherapi.com/v1/current.json?key=' + API_key + '&aqi=yes&q=';
    let inputRef = useRef();
    let [userLocation, setUserLocation] = useState();
    let [temperature, setTemperature] = useState();
    let [tempIcon, setTempIcon] = useState();
    let [aqiIcon, setAqiIcon] = useState();
    let [aqi, setAqi] = useState();


    const [loading, setLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [weather, setWeather] = useState({});


    const search = (e) => {

        let city = 'mumbai';
        let query = inputRef.current.value === '' ? city : inputRef.current.value;
        let url = REQUESTED_URL + query;
        setLoading(true)
        fetch(url)
            .then((res) => res.json())
            .then((result) => {
                setLoading(false);
                setWeather(result);
                console.log(result.location.name);

                setUserLocation(result.location.name + ',' + result.location.country)
                // eslint-disable-next-line
                setTemperature(result.current.temp_c + 'C' + ' ')
                setTempIcon('https:' + result.current.condition.icon)
                setAqiIcon(getEmoji(result.current.air_quality.pm10.toFixed(2)));
                setAqi(result.current.air_quality.pm10.toFixed(2))
                inputRef.current.value = '';
                setShowInfo(true);

            });

    };


    function getEmoji(aqi) {
        if (aqi < 50) {
            return '😁';
        }
        else if (aqi < 100) {
            return '😊';
        }
        else if (aqi < 150) {
            return '😐';
        }
        else if (aqi < 200) {
            return '😷';
        }
        else if (aqi < 300) {
            return '🤢';
        }
        else {
            return '💀';
        }

    }


    return (
        <div className='container'>
            <div className="header">
                <h2>Weather and Pollution Info </h2>
            </div>
            <div className="location">
                <div> Location</div>
                <div>
                    <input type="text" id="location" ref={inputRef} name="location" onChange={()=>{setShowInfo(false);}}></input>
                </div>

            </div>
            <div class="query-btn">

                <button id="query-btn" onClick={search}> Get Info</button>


            </div>

            {
                loading && (<h3>Loading...</h3>)
            }

            <div className={showInfo ? 'show' : 'hidden'}>
                <WeatherCard
                    weather={weather}
                    userLocation={userLocation}
                    temperature={temperature}
                    tempIcon={tempIcon}
                    aqiIcon={aqiIcon}
                    aqi={aqi}
                />
            </div>

        </div>
    );
}

export default Weather;