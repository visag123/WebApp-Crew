import React from 'react';

const Input = (props) => {
  const { type, id, className, placeholder, label, name, value, onChange, disabled, wrapperClass} = props
  
  return (
    <div className={``}>
      <label htmlFor={id} >{label}</label>
      <input type={type} id={id} placeholder={placeholder} className={className} label={label} name={name} 
      value={value} onChange={onChange} required autoComplete="off" disabled={disabled}/>
    </div>
  )
}

export default Input;