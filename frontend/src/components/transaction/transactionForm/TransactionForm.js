import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from '../../card/Card'
import Supplier from '../../supplier/Supplier';
import Store from '../../store/Store';
import Staff from '../../staff/Staff';
import SelectedProducts from '../../product/selectedProducts/SelectedProducts';
import AddProduct from "../../product/addProduct/AddProduct";
import StatusDropdown from '../../status/StatusDropdown';
import { getProducts } from '../../../redux/features/product/productSlice';
import './TransactionForm.scss'; // Import SCSS file

const TransactionForm = ({
  handleInputChange,
  saveTransaction,
}) => {
  const dispatch = useDispatch();

  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());

    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);


  const [suppliers, setSuppliers] = useState(["Supplier 1","Supplier 2"]);
  const [stores, setStores] = useState(["Store 1","Store 2"]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [status, setStatus] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Fetch data from the database for suppliers, stores, and products
    // You might need to use an API call to your backend
    // Example:
    // fetch('/api/suppliers').then(res => res.json()).then(data => setSuppliers(data));
    // fetch('/api/stores').then(res => res.json()).then(data => setStores(data));
    // fetch('/api/products').then(res => res.json()).then(data => setProducts(data));
  }, []);

  useEffect(() => {
    let total = 0;
    for(var i of selectedProducts){
      total += parseInt(i.price) * parseInt(i.quantity);
    }
    console.log(total)
    setTotalPrice(total);
  }, [selectedProducts]);

  const handleAddProduct = (productId, quantity) => {    
    const existingProductIndex = selectedProducts.findIndex((product) => product._id === productId);
    console.log(existingProductIndex);
    if (existingProductIndex !== -1) {
      // If the product already exists, update its quantity
      const updatedProducts = [...selectedProducts];
      updatedProducts[existingProductIndex].quantity += parseInt(quantity);
      setSelectedProducts(updatedProducts);
    } else {
      // If the product doesn't exist, add it to the list
      const selectedProduct = products.find((product) => product._id === productId);

      if (selectedProduct) {
        const newProduct = { ...selectedProduct, quantity: parseInt(quantity) };
        setSelectedProducts([...selectedProducts, newProduct]);
      }
    }
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = selectedProducts.filter((product) => product._id !== productId);
    setSelectedProducts(updatedProducts);
  };

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
    // additional logic if needed, e.g., fetching specific data based on supplier
  };

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
    // additional logic if needed
  };

  const handleStaffChange = (e) => {
    setSelectedStaff(e.target.value);
    // additional logic if needed
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    // additional logic if needed
  };

  return (
    <div className='transaction-form'>
      <Card cardClass={"card"}>
        <form onSubmit={saveTransaction}>
          <Supplier 
            suppliers={suppliers}
            selectedSupplier={selectedSupplier}
            handleSupplierChange={handleSupplierChange}
          />
          <Store stores={stores} selectedStore={selectedStore} handleStoreChange={handleStoreChange} />
          <Staff handleStaffChange={handleStaffChange} />
          <div className='--flex-between --flex-dir-column'>
            <label>Status:</label>
            <StatusDropdown handleStatusChange={handleStatusChange} />
          </div>
          
          <AddProduct products={products} handleAddProduct={handleAddProduct} />
          
        </form>
      </Card>
      <Card cardClass={"card"}>
        <SelectedProducts products={selectedProducts} handleRemoveProduct={handleRemoveProduct}/>
        <div>
          <label className='total-price'>Total Price: ${totalPrice}</label>
        </div>
        <button>Save Transaction</button>
      </Card>
    </div>
  );
};

export default TransactionForm;