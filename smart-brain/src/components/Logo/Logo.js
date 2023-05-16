import React from 'react'
import { Tilt } from 'react-tilt'
import './Logo.css';
import brain from './brain.png'

const defaultOptions = {
	reverse:        false,  // reverse the tilt direction
	max:            45,     // max tilt rotation (degrees)
	perspective:    1000,   // Transform perspective, the lower the more extreme the tilt gets.
	scale:          1.1,    // 2 = 200%, 1.5 = 150%, etc..
	speed:          2000,   // Speed of the enter/exit transition
	transition:     true,   // Set a transition on enter/exit.
	axis:           null,   // What axis should be disabled. Can be X or Y.
	reset:          true,    // If the tilt effect has to be reset on exit.
	easing:         "cubic-bezier(.03,.98,.52,.99)",    // Easing on enter/exit.
}

const Logo = () => {
  return (
   <div className='na4 mt0'>
      <Tilt className='tilt br2 shadow-2' options={defaultOptions} style={{ height: 100, width: 100 }}>
        <div className='inner-tilt' style={{padding: '20px'}}><img src={brain} alt='smartbrain logo' /></div>
      </Tilt>
   </div>
  )
}

export default Logo;