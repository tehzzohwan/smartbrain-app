import React from 'react'
import './linkForm.css';
const LinkForm = ({ onInputChange, onPictureSubmit, errMessage }) => {
  return (
    <div>
      <p className="f3">
        {"This magic Brain will detect face in your pictures. Give it a try"}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center black"
            type="text"
            onChange={onInputChange}
          />
          <button
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
            onClick={onPictureSubmit}
          >
            Detect
          </button>
        </div>
      </div>

      {errMessage && (
        <div className="ba br3 h2 mt1 center w-20 bg-red">
          <div className="dib v-mid">{errMessage}</div>
        </div>
      )}
    </div>
  );
}

export default LinkForm;