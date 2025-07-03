import React from 'react'
import styled from 'styled-components';
import LightSwitch from '../../components/Switch/LightSwitch/LightSwitch';
import ChatBox from '../component/ChatBox'
import WeatherBox from '../Weather/WeatherBox';

export default function Main({ mode, toggleMode }) {
  return (
    <Container>
      <LightSwitch mode={mode} toggleMode={toggleMode}/>
      <WeatherBox />
      <ChatBox />
    </Container>
  )
}

const Container = styled.div`

`