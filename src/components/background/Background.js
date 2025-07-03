import React from 'react'
import './background.css'

export default function Background({ mode }) {
  return (
    <div id="background-wrap" className={`background ${mode}`} >
      <div className="x1">
        <div className={`cloud ${mode}`}></div>
      </div>

      <div className="x2">
        <div className={`cloud ${mode}`}></div>
      </div>

      <div className="x3">
        <div className={`cloud ${mode}`}></div>
      </div>

      <div className="x4">
        <div className={`cloud ${mode}`}></div>
      </div>

      <div className="x5">
        <div className={`cloud ${mode}`}></div>
      </div>
    </div>
  )
}
