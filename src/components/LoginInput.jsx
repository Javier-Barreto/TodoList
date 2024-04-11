import React from 'react'
import PropTypes from 'prop-types';

export const LoginInput = ({ inputId, inputLabel, inputOnChangeFunc, inputPlaceholder, inputType, inputValue }) => {
  return (
    <div className="form-group m-3">
      <label htmlFor={inputId}>{inputLabel}</label>
      <input type={inputType} className="form-control" id={inputId} placeholder={inputPlaceholder} onChange={(e) => inputOnChangeFunc(e.target.value)} 
              value={inputValue} required/>
    </div>
  )
}


LoginInput.propTypes = {
  inputId: PropTypes.string,
  inputLabel: PropTypes.string,
  inputOnChangeFunc: PropTypes.func,
  inputPlaceholder: PropTypes.string,
  inputType: PropTypes.string,
  inputValue: PropTypes.string
}