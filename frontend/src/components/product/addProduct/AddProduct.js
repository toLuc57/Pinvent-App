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
      {products.length !== 0 ? (
        <>
          <label htmlFor='product'>Add Product:</label>
          <select id='product' name='product' value={selectedProduct} onChange={handleProductChange}>
            <option>--Select product--</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          <label htmlFor='quantity'>Quantity:</label>
          <input type="number" 
          id='quantity' name='quantity' 
          value={quantity} 
          onChange={handleQuantityChange} 
          min={1}
          max={200}
          />
          <span onClick={handleAddClick}>Add Product</span>
        </>
      ) : (
        <>
          <p className='error'>-- No product found, please add a product...</p>
          <hr/>
        </>
      )}
    </div>
  );
};

export default AddProduct;
