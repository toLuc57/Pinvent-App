import React, { useState } from 'react';
import "./AddProduct.scss";

const AddProduct = ({ products, handleAddProduct }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAddClick = () => {
    handleAddProduct(selectedProduct, quantity);
    // Reset fields after adding the product
    setSelectedProduct('');
    setQuantity(1);
  };

  return (
    <div className='add-product-transaction'>
      <label>Add Product:</label>
      <select value={selectedProduct} onChange={handleProductChange}>
        <option value="">Select a product</option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.name}
          </option>
        ))}
      </select>
      <label>Quantity:</label>
      <input type="number" value={quantity} onChange={handleQuantityChange} />
      <span onClick={handleAddClick}>Add Product</span>
    </div>
  );
};

export default AddProduct;
