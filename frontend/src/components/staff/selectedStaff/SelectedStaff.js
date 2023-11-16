import React from 'react';
import './SelectedStaff.scss';

const Staff = ({ staffs, selectedStaff, handleStaffChange }) => {
  return (
    <div className='staff'>
      <label>Staff:</label>
      <select value={selectedStaff} name='staff' onChange={handleStaffChange}>
        {staffs.map((staff, index) => (
          <option key={index} value={staff._id}>
            {staff.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Staff;
