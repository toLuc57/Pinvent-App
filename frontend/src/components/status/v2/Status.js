import React from 'react';

const Status = ({ statusCode }) => {
  const getStatusText = (code) => {
    switch (code) {
      case 1:
        return 'Active';
      case 2:
        return 'Inactive';
      default:
        return 'Unknow';
    }
  };

  const getStatusColor = (code) => {
    switch (code) {
      case 1:
        return 'green';
      case 2:
        return 'red';
      default:
        return 'black';
    }
  };

  const statusText = getStatusText(statusCode);
  const statusColor = getStatusColor(statusCode);

  return (
    <span id="status" style={{ color: statusColor }}>
      {statusText}
    </span>
  );
};

export default Status;
