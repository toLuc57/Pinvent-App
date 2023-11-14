import React from 'react';
import './Store.scss';

const Store = ({ stores, selectedStore, handleStoreChange }) => {
  return (
    <div className='store'>
      <label>Store:</label>
      <select value={selectedStore} onChange={handleStoreChange}>
        {stores.map((store, index) => (
          <option key={index} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Store;
