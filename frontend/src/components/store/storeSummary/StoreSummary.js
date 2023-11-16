import React, { useEffect } from "react";
import "./StoreSummary.scss";
import { FaToggleOn, FaStore  } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_STATUS,
  selectTotalValue,
  selectActiveTotal,
  selectTotalInactivity,
} from "../../../redux/features/store/storeSlice";

// Icons
const storeIcon = <FaStore size={40} color="#fff" />
const toggleOn = <FaToggleOn size={40} color="#fff" />;
const toggleOff = <FaToggleOff size={40} color="#fff" />;

const StoreSummary = ({ stores }) => {
  const dispatch = useDispatch();
  const totalValue = useSelector(selectTotalValue);
  const activeTotal = useSelector(selectActiveTotal);
  const totalInactivity = useSelector(selectTotalInactivity);

  useEffect(() => {
    dispatch(CALC_STATUS(stores));
  }, [dispatch, stores]);

  return (
    <div className="store-summary">
      <h3 className="--mt">Stores</h3>
      <div className="info-summary">
        <InfoBox
          icon={storeIcon}
          title={"Total Stores"}
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

export default StoreSummary;
