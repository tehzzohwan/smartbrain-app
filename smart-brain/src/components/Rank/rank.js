import React from 'react'
import './rank.css'
const Rank = ({user, count}) => {
  return (
    <div className="r-container">
      <div className="white f3">
        {`${user.name}, your current entry count is...`}
      </div>
      <div className="white f1">{`#${count}`}</div>
    </div>
  );
}

export default Rank;  
