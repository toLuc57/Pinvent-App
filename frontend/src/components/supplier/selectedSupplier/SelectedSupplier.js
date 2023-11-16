import React from 'react';
import "./SelectedSupplier.scss";

const Supplier = ({ suppliers, selectedSupplier, handleSupplierChange }) => {
  return (
    <div className='supplier'>
      <label>Supplier:</label>
      <select value={selectedSupplier} name='supplier' onChange={handleSupplierChange}>
        {suppliers.map((supplier, index) => (
          <option key={index} value={supplier._id}>
            {supplier.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Supplier;
