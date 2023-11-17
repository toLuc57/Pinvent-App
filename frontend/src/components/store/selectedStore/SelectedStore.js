import React from 'react';
import "./SelectedStore.scss";

const Store = ({ stores, selectedStore, handleStoreChange }) => {
  return (
    <div className='store'>
      {stores.length !== 0 ? (
        <>
          <label htmlFor='store'>Store:</label>
          <select 
          value={selectedStore} 
          id='store' name='store' 
          onChange={handleStoreChange}>
            {stores.map((store, index) => (
              <option key={index} value={store._id}>
                {store.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <p className='error'>-- No store found, please add a store...</p>
          <hr/>
        </>
      )}
    </div>
  );
};

export default Store;
