import React from 'react'


const faceRecognition = ({ imageUrl }) => {
  return (
   <div className='center'>
        <img alt={''} src={imageUrl} />
   </div>
  )
}

export default faceRecognition;