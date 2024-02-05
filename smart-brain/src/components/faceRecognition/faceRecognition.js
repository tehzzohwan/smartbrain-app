import React from 'react'
import './faceRecognition.css';

const faceRecognition = ({ imageUrl, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2' style={{ left: '500px' }}>
        <img id='inputimage' className='center' alt='' src={imageUrl} width='500px' height='auto' style={{borderRadius: '15px'}}/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  )
}

export default faceRecognition;







