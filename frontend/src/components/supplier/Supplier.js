import React from 'react';
import "./Supplier.scss";

const Supplier = ({ suppliers, selectedSupplier, handleSupplierChange }) => {
  return (
    <div className='supplier'>
      <label>Supplier:</label>
      <select value={selectedSupplier} onChange={handleSupplierChange}>
        {suppliers.map((supplier, index) => (
          <option key={index} value={supplier.id}>
            {supplier.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Supplier;
