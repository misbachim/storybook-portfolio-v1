import React from 'react';
import './styles.css';
import moment from 'moment';
import {
  FaCloud,
  FaBolt,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaSnowflake,
  FaSun,
  FaSmog,
} from 'react-icons/fa';
import styled from 'styled-components';
import Clock from './Clock';

export default function Weather({weatherData, metric}) {
  
  let weatherIcon = null;

  if (weatherData.weather[0].main === 'Thunderstorm') {
    weatherIcon = <FaBolt />;
  } else if (weatherData.weather[0].main === 'Drizzle') {
    weatherIcon = <FaCloudRain />;
  } else if (weatherData.weather[0].main === 'Rain') {
    weatherIcon = <FaCloudShowersHeavy />;
  } else if (weatherData.weather[0].main === 'Snow') {
    weatherIcon = <FaSnowflake />;
  } else if (weatherData.weather[0].main === 'Clear') {
    weatherIcon = <FaSun />;
  } else if (weatherData.weather[0].main === 'Clouds') {
    weatherIcon = <FaCloud />;
  } else {
    weatherIcon = <FaSmog />;
  }

  return (
    <div className="card">
      <div className='background-muted'>
        <div className='row flex-edges margin-none padding-left-small padding-right-small'>
          <p className="card-text margin-none"> <Clock /> {moment().format('dddd')}, <span>{moment().format('LL')}</span></p>
          
          {(typeof weatherData.main != 'undefined') ? (
            <div className="row flex-edges margin-none">
              <p className="card-text margin-none padding-right-small" >
                {weatherIcon}
              </p>
              <p className="card-text margin-none" >
                {weatherData.main.temp} &deg;C
              </p>
            </div>
          ) : <></>
          }
        </div>
      </div>
  </div>
  )
}