import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forgot from "./pages/auth/Forgot";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/auth/authSlice";
import AddTransaction from "./pages/transaction/AddTransaction";
import Transaction from "./pages/transaction/Transaction";
import AddStore from "./pages/store/AddStore";
import Store from "./pages/store/Store";
import EditStore from "./pages/store/EditStore";
import StoreDetail from "./components/store/storeDetail/StoreDetail";
import AddStaff from "./pages/staff/AddStaff";
import Staff from "./pages/staff/Staff";
import EditStaff from "./pages/staff/EditStaff";
import StaffDetail from "./components/staff/staffDetail/StaffDetail";
import AddSupplier from "./pages/supplier/AddSupplier";
import Supplier from "./pages/supplier/Supplier";
import EditSupplier from "./pages/supplier/EditSupplier";
import SupplierDetail from "./components/supplier/supplierDetail/SupplierDetail";
import AddProduct from "./pages/product/AddProduct";
import EditProduct from "./pages/product/EditProduct";
import Product from "./pages/product/Product";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpassword/:resetToken" element={<Reset />} />

        <Route
          path="/dashboard"
          element={
            <Sidebar>
              <Layout>
                <Dashboard />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/products"
          element={
            <Sidebar>
              <Layout>
                <Product />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-transaction/"
          element={
            <Sidebar>
              <Layout>
                <AddTransaction />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/transactions/"
          element={
            <Sidebar>
              <Layout>
                <Transaction />
              </Layout>
            </Sidebar>
          }
        />        
        <Route
          path="/stores/"
          element={
            <Sidebar>
              <Layout>
                <Store />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-store/"
          element={
            <Sidebar>
              <Layout>
                <AddStore />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/store-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <StoreDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-store/:id"
          element={
            <Sidebar>
              <Layout>
                <EditStore />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-staff/"
          element={
            <Sidebar>
              <Layout>
                <AddStaff/>
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/staffs/"
          element={
            <Sidebar>
              <Layout>
                <Staff/>
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/staff-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <StaffDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-staff/:id"
          element={
            <Sidebar>
              <Layout>
                <EditStaff />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/add-supplier/"
          element={
            <Sidebar>
              <Layout>
                <AddSupplier />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/suppliers/"
          element={
            <Sidebar>
              <Layout>
                <Supplier />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/supplier-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <SupplierDetail />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-supplier/:id"
          element={
            <Sidebar>
              <Layout>
                <EditSupplier />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
