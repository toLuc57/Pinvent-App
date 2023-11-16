import React, { useEffect } from "react";
import "./StaffSummary.scss";
import { SiStaffbase } from "react-icons/si";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa6";
import InfoBox from "../../infoBox/InfoBox";
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_STATUS,
  selectTotalValue,
  selectActiveTotal,
  selectTotalInactivity,
} from "../../../redux/features/staff/staffSlice";

// Icons
const staffIcon = <SiStaffbase size={40} color="#fff"/>
const toggleOn = <FaToggleOn size={40} color="#fff" />;
const toggleOff = <FaToggleOff size={40} color="#fff" />;

const StaffSummary = ({ staffs }) => {
  const dispatch = useDispatch();
  const totalValue = useSelector(selectTotalValue);
  const activeTotal = useSelector(selectActiveTotal);
  const totalInactivity = useSelector(selectTotalInactivity);

  useEffect(() => {
    dispatch(CALC_STATUS(staffs));
  }, [dispatch, staffs]);

  return (
    <div className="staff-summary">
      <h3 className="--mt">Staffs</h3>
      <div className="info-summary">
        <InfoBox
          icon={staffIcon}
          title={"Total Staffs"}
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

export default StaffSummary;
