import React, { useEffect } from "react";
import "./TransactionSummary.scss";
import { AiOutlineCheck } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FcProcess } from "react-icons/fc";
import InfoBox from "../../infoBox/InfoBox";
import {GiCancel, GiSandsOfTime} from "react-icons/gi"
import { useDispatch, useSelector } from "react-redux";
import {
  CALC_STATUS,
  selectTotalWaitingStatus,
  selectTotalProcessingStatus,
  selectTotalSussessStatus,
  selectTotalCanceledStatus,
  selectTotalValue,
} from "../../../redux/features/transaction/transactionSlice";

// Icons
const earningIcon = <FaMoneyBillAlt size={40} color="#fff" />;
const transactionIcon = <BsCart4 size={40} color="#fff" />;
const waitingIcon = <GiSandsOfTime size={40} color="#fff" />;
const processingIcon = <FcProcess size={40} color="#fff" />;
const successIcon = <AiOutlineCheck size={40} color="#fff" />;
const cancelIcon = <GiCancel size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const TransactionSummary = ({ transactions }) => {
  const dispatch = useDispatch();
  const totalValue = useSelector(selectTotalValue);
  const totalWaitingStatus = useSelector(selectTotalWaitingStatus);
  const totalProcessingStatus = useSelector(selectTotalProcessingStatus);
  const totalSussessStatus = useSelector(selectTotalSussessStatus);
  const totalCanceledStatus = useSelector(selectTotalCanceledStatus);

  useEffect(() => {
    dispatch(CALC_STATUS(transactions));
  }, [dispatch, transactions]);

  return (
    <div className="transaction-summary">
      <h3 className="--mt">Transactions</h3>
      <div className="info-summary">
        <InfoBox
          icon={transactionIcon}
          title={"Total Transactions"}
          count={transactions.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$${formatNumbers(totalValue.toFixed(2))}  `}
          bgColor="card2"
        />        
        <InfoBox
          icon={waitingIcon}
          title={"Wait for confirmation"}
          count={totalWaitingStatus}
          bgColor="card3"
        />
        <InfoBox
          icon={processingIcon}
          title={"Progressing"}
          count={totalProcessingStatus}
          bgColor="card4"
        />
        <InfoBox
          icon={successIcon}
          title={"Success"}
          count={totalSussessStatus}
          bgColor="card5"
        />
        <InfoBox
          icon={cancelIcon}
          title={"Cancel"}
          count={totalCanceledStatus}
          bgColor="card6"
        />
      </div>
    </div>
  );
};

export default TransactionSummary;
