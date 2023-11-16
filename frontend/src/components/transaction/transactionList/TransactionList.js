import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./TransactionList.scss";
import { FaEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_TRANSACTIONS,
  selectFilteredTransactions,
} from "../../../redux/features/transaction/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import StatusDropdown from "../../status/v4/StatusDropdown";
import Status from "../../status/v4/Status";
import { 
  updateTransaction,
  getTransactions
} from "../../../redux/features/transaction/transactionSlice";

const TransactionList = ({ transactions, isLoading }) => {
  const [search, setSearch] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const filteredTransactions = useSelector(selectFilteredTransactions);

  const dispatch = useDispatch();

  const update = async (id, code) => {
    console.log(id);
    const formData = new FormData();    
    formData.append("status", code);
    console.log(...formData)
    await dispatch(updateTransaction({id, formData}));
    await dispatch(getTransactions());

  };

  const updateStatus = (code) => {
    console.log(code)
    switch (code) {
      case 1:
      case "1":
        return 'pending confirmation';
      case 2:
      case "2":
        return 'progress';
      case 3:
      case "3":
        return 'success';
      case 4:
        case "4":
        return 'cancellation';
      default:
        return `Unknow`;
    }
  };

  const confirmUpdate = (id, code) => {
    const status = updateStatus(code);
    confirmAlert({
      title: "Update Transaction Status",
      message: `Are you sure you want to update the ${status} status for this transaction?`,
      buttons: [
        {
          label: "Update",
          onClick: () => update(id, code),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredTransactions.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredTransactions.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredTransactions]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredTransactions.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_TRANSACTIONS({ transactions, search }));
  }, [transactions, search, dispatch]);


  return (
    <div className="transaction-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Transactions</h3>
          </span>
          {/* <span>
            <select
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span> */}
          <span>
            <StatusDropdown handleStatusChange={(e) => setSearch(e.target.value)}></StatusDropdown>
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && currentItems.length === 0 ? (
            <p>-- No transaction found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Status</th>
                  <th>Supplier</th>
                  <th>Staff</th>
                  <th>Store</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((transaction, index) => {
                  const { _id, status, supplier, staff, store, total } = transaction;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td><Status statusCode={status}/></td>
                      <td>{supplier}</td>
                      <td>{staff}</td>
                      <td>{store}</td>
                      <td>
                        {"$"}
                        {total}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/transaction-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        {isEditing ? (
                          <>
                          <span>
                            <StatusDropdown handleStatusChange={(e) => confirmUpdate(_id, e.target.value)}></StatusDropdown>                            
                          </span>
                          <span>
                            <GiCancel onClick={() => setIsEditing(false)}  size={20} color={"red"} />
                          </span>
                          </>
                        ) : (
                          <span>
                            <FaEdit onClick={() => setIsEditing(true)} size={20} color={"green"} />
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default TransactionList;
