import React from 'react';
import './StatusDropdown.scss';

const StatusDropdown = ({ 
  statusCode, 
  handleStatusChange 
}) => {
  const statusOptions = [
    { value: 1, label: 'Wait for confirmation', color: 'orange' },
    { value: 2, label: 'Processing', color: 'blue' },
    { value: 3, label: 'Success', color: 'green' },
    { value: 4, label: 'Cancel', color: 'red' },
  ];

  return (
    <div className='status-dropdown'>
      <select onChange={handleStatusChange} 
      id="status" name='status'      
      value={statusCode}>
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value} style={{ color: option.color }}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusDropdown;