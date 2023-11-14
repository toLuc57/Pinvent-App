import React from 'react';
import './Staff.scss';

const Staff = ({ handleStaffChange }) => {
  return (
    <div className='staff'>
      <label>Staff:</label>
      <input type="text" onChange={handleStaffChange} />
    </div>
  );
};

export default Staff;
