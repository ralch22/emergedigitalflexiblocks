import React from 'react';

const CustomSwitchButton = ({ label, onChange, checked }) => {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: 'white',
        border: '1px solid gray',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
      }}
    >
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ visibility: 'hidden', position: 'absolute' }}
      />
      <span
        style={{
          width: '30px',
          height: '18px',
          backgroundColor: checked ? 'lightblue' : 'lightgray',
          borderRadius: '50px',
          display: 'inline-block',
          transition: 'background-color 0.3s',
        }}
      />
    </label>
  );
};

export default CustomSwitchButton;
