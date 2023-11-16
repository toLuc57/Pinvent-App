import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplierList from "../../components/supplier/supplierList/SupplierList";
import SupplierSummary from "../../components/supplier/supplierSummary/SupplierSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getSuppliers } from "../../redux/features/supplier/supplierSlice";

const Supplier = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { suppliers, isLoading, isError, message } = useSelector(
    (state) => state.supplier
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getSuppliers());
    } 

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <SupplierSummary suppliers={suppliers} />
      <SupplierList suppliers={suppliers} isLoading={isLoading} />
    </div>
  );
};

export default Supplier;
