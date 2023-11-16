import React, { useEffect } from "react";
import "./SupplierSummary.scss";
import { GoContainer } from "react-icons/go";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_STATUS,
  selectTotalValue,
  selectActiveTotal,
  selectTotalInactivity,
} from "../../../redux/features/supplier/supplierSlice";

// Icons
const supplierIcon = <GoContainer size={40} color="#fff"/>
const toggleOn = <FaToggleOn size={40} color="#fff" />;
const toggleOff = <FaToggleOff size={40} color="#fff" />;

const SupplierSummary = ({ suppliers }) => {
  const dispatch = useDispatch();
  const totalValue = useSelector(selectTotalValue);
  const activeTotal = useSelector(selectActiveTotal);
  const totalInactivity = useSelector(selectTotalInactivity);

  useEffect(() => {
    dispatch(CALC_STATUS(suppliers));
  }, [dispatch, suppliers]);

  return (
    <div className="supplier-summary">
      <h3 className="--mt">Suppliers</h3>
      <div className="info-summary">
        <InfoBox
          icon={supplierIcon}
          title={"Total Suppliers"}
          count={totalValue}
          bgColor="card1"
        />     
        <InfoBox
          icon={toggleOn}
          title={"Active"}
          count={activeTotal}
          bgColor="card2"
        />
        <InfoBox
          icon={toggleOff}
          title={"Inactive"}
          count={totalInactivity}
          bgColor="card3"
        />
      </div>
    </div>
  );
};

export default SupplierSummary;
