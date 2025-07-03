import React from 'react'
import './styles.css'

export default function LightSwitch({ mode, toggleMode }) {
  return (
    <div className="toggleWrapper">
      <input type="checkbox" id="dn" onChange={toggleMode} defaultChecked={mode === 'dark'? true : false}/>
      <label htmlFor="dn" className="toggle">
        <span className="toggle__handler">
          <span className="crater crater--1"></span>
          <span className="crater crater--2"></span>
          <span className="crater crater--3"></span>
        </span>
        <span className="star star--1"></span>
        <span className="star star--2"></span>
        <span className="star star--3"></span>
        <span className="star star--4"></span>
        <span className="star star--5"></span>
        <span className="star star--6"></span>
      </label>
    </div>
  )
}
