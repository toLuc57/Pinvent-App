import React from 'react';
import "./SelectedSupplier.scss";

const Supplier = ({ suppliers, selectedSupplier, handleSupplierChange }) => {
  return (
    <div className='supplier'>
      {suppliers.length !== 0 ? (
        <>
          <label htmlFor='supplier'>Supplier:</label>
          <select 
          value={selectedSupplier} 
          id='supplier' name='supplier' 
          onChange={handleSupplierChange}>
            {suppliers.map((supplier, index) => (
              <option key={index} value={supplier._id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </>
      ) : (
        <>
          <p className='error'>-- No supplier found, please add a supplier...</p>
          <hr/>
        </>
      )}
    </div>
  );
};

export default Supplier;
