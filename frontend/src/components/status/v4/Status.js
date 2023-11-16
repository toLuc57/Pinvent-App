import React from 'react';

const Status = ({ statusCode }) => {
  const getStatusText = (code) => {
    switch (code) {
      case 1:
        return 'Wait for confirmation';
      case 2:
        return 'Processing';
      case 3:
        return 'Success';
      case 4:
        return 'Cancel';
      default:
        return 'Unknow';
    }
  };

  const getStatusColor = (code) => {
    switch (code) {
      case 1:
        return 'orange';
      case 2:
        return 'blue';
      case 3:
        return 'green';
      case 4:
        return 'red';
      default:
        return 'black';
    }
  };

  const statusText = getStatusText(statusCode);
  const statusColor = getStatusColor(statusCode);

  return (
    <span id='status' style={{ color: statusColor }}>
      {statusText}
    </span>
  );
};

export default Status;
