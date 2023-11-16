import React from 'react';
import './StatusDropdown.scss';

const StatusDropdown = ({ 
  statusCode, 
  handleStatusChange 
}) => {
  const statusOptions = [
    { value: 1, label: 'Active', color: 'green' },
    { value: 2, label: 'Inactive', color: 'red' },
  ];

  return (
    <div className='status-dropdown'>
      <select 
      onChange={handleStatusChange} 
      id='status' name='status' 
      defaultValue={statusCode ?? "--Select status--"}>
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