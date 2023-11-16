import React from 'react';
import './SelectedStore.scss';

const Store = ({ stores, selectedStore, handleStoreChange }) => {
  return (
    <div className='store'>
      <label>Store:</label>
      <select value={selectedStore} name='store' onChange={handleStoreChange}>
        {stores.map((store, index) => (
          <option key={index} value={store._id}>
            {store.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Store;