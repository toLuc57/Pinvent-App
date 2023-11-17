import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from '../../card/Card'
import Supplier from '../../supplier/selectedSupplier/SelectedSupplier';
import Store from '../../store/selectedStore/SelectedStore';
import Staff from '../../staff/selectedStaff/SelectedStaff';
import SelectedProducts from '../../product/selectedProducts/SelectedProducts';
import AddProduct from "../../product/addProduct/AddProduct";
import StatusDropdown from '../../status/v4/StatusDropdown';
import { getProducts } from '../../../redux/features/product/productSlice';
import { getSuppliers } from '../../../redux/features/supplier/supplierSlice';
import { getStores } from '../../../redux/features/store/storeSlice';
import { getStaffs } from '../../../redux/features/staff/staffSlice';
import './TransactionForm.scss'; // Import SCSS file

const TransactionForm = ({
  handleSaveTransaction
}) => {
  const dispatch = useDispatch();

  const { products, isError: productIsError, message: productMessage  } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());

    if (productIsError) {
      console.log(productMessage);
    }
  }, [productIsError, productMessage, dispatch]);

  const { suppliers, isError: supplierIsError, message: supplierMessage  } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    dispatch(getSuppliers());

    if (supplierIsError) {
      console.log(supplierMessage);
    }
  }, [supplierIsError, supplierMessage , dispatch]);

  const { stores, isError: storeIsError, message: storeMessage  } = useSelector(
    (state) => state.store
  );

  useEffect(() => {
    dispatch(getStores());

    if (storeIsError) {
      console.log(storeMessage);
    }

  }, [storeIsError, storeMessage, dispatch]);

  const { staffs, isError: staffIsError, message: staffMessage  } = useSelector(
    (state) => state.staff
  );

  useEffect(() => {
    dispatch(getStaffs());

    if (staffIsError) {
      console.log(staffMessage);
    }
  }, [staffIsError, staffMessage , dispatch]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');
  const [status, setStatus] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    let total = 0;
    for(var i of selectedProducts){
      total += parseInt(i.price) * parseInt(i.quantity);
    }
    setTotalPrice(total);
    // Disable submit button when no attribute is present
    console.log("Disable submit button when no attribute is present")
    if(selectedProducts.length === 0 || staffs.length === 0 
      || suppliers.length === 0 || stores.length === 0){
        setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
    console.log(isButtonDisabled)
  }, [selectedProducts, staffs, suppliers, stores, isButtonDisabled]);
  
  const handleAddProduct = (productId, quantity) => {    
    const existingProductIndex = selectedProducts.findIndex((product) => product._id === productId);
    // console.log(existingProductIndex);
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

  const saveTransaction = async (e) => {
    e.preventDefault();    
    console.log("Save Transaction");
    const details = [];
    selectedProducts.forEach((value, index) => {
      const detail = {
        product_id: selectedProducts[index].product_id,
        quantity: selectedProducts[index].quantity,
        price: selectedProducts[index].price,
      }
      details.push(detail);
    })
    const formData = {
      supplier: selectedSupplier === '' ? suppliers[0]._id : selectedSupplier,
      store: selectedStore === '' ? stores[0]._id : selectedStore,
      staff: selectedStaff === '' ? staffs[0]._id : selectedStaff,
      status,
      details,
      total: totalPrice
    };
    console.log(formData);
    
    handleSaveTransaction(formData)
  };

  return (
    <div className='transaction-form'>
      <Card cardClass={"card"}>
        <Supplier 
          suppliers={suppliers}
          selectedSupplier={selectedSupplier}
          handleSupplierChange={handleSupplierChange}
        />
        <Store stores={stores} 
        selectedStore={selectedStore} 
        handleStoreChange={handleStoreChange}
        />
        <Staff 
        staffs={staffs}
        selectedStaff={selectedStaff}
        handleStaffChange={handleStaffChange} 
        />
        <div className='status'>
          <label htmlFor='status'>Status:</label>
          <StatusDropdown handleStatusChange={handleStatusChange} />
        </div>
        
        <AddProduct 
        products={products} 
        handleAddProduct={handleAddProduct} 
        />
        
      </Card>
      <Card cardClass={"card"}>
        <SelectedProducts products={selectedProducts} handleRemoveProduct={handleRemoveProduct}/>
        <hr/>
        <div>
          <label className='total-price'>Total Price: ${totalPrice}</label>
        </div>
        <button type='submit'
        onClick={saveTransaction} disabled={isButtonDisabled}>Save Transaction</button>
      </Card>
    </div>
  );
};

export default TransactionForm;