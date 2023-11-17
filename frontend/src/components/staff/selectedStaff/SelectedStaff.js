import React from 'react';
import "./SelectedStaff.scss";

const Staff = ({ staffs, selectedStaff, handleStaffChange }) => {
  return (
    <div className='staff'>
      {staffs.length !== 0 ? (
        <>
          <label htmlFor='staff'>Staff:</label>
          <select 
          value={selectedStaff} 
          id='staff' name='staff' 
          onChange={handleStaffChange}>
            {staffs.map((staff, index) => (
              <option key={index} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <p className='error'>-- No staff found, please add a staff...</p>
          <hr/>
        </>
      )}
    </div>
  );
};

export default Staff;
