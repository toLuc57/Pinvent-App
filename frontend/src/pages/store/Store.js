import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StoreList from "../../components/store/storeList/StoreList";
import StoreSummary from "../../components/store/storeSummary/StoreSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getStores } from "../../redux/features/store/storeSlice";

const Store = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { stores, isLoading, isError, message } = useSelector(
    (state) => state.store
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getStores());
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
      <StoreSummary stores={stores} />
      <StoreList stores={stores} isLoading={isLoading} />
    </div>
  );
};

export default Store;
