import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./StoreList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_STORES,
  selectFilteredStores,
} from "../../../redux/features/store/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteStore,
  getStores,
} from "../../../redux/features/store/storeSlice";
import { Link } from "react-router-dom";
import Status from "../../status/v2/Status";

const StoreList = ({ stores, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredStores = useSelector(selectFilteredStores);

  const dispatch = useDispatch();

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const delStore = async (id) => {
    console.log(id);
    await dispatch(deleteStore(id));
    await dispatch(getStores());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Store",
      message: "Are you sure you want to delete this store.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delStore(id),
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

    setCurrentItems(filteredStores.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredStores.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredStores]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredStores.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_STORES({ stores, search }));
  }, [stores, search, dispatch]);

  return (
    <div className="store-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Stores</h3>
          </span>
          <span>
            <Search
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </span>
        </div>

        {isLoading && <SpinnerImg />}

        <div className="table">
          {!isLoading && stores.length === 0 ? (
            <p>-- No store found, please add a store...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Location</th>
                  <th>State</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((store, index) => {
                  const { _id, name, phone, location, state, status } = store;
                  return (
                    <tr key={_id}>
                      <td>{itemsPerPage*(pageCount-1) + index + 1}</td>
                      <td>{name}</td>
                      <td>{phone}</td>
                      <td>
                        {shortenText(location, 16)}
                      </td>
                      <td>{state}</td>
                      <td><Status statusCode={status} /></td>
                      <td className="icons">
                        <span>
                          <Link to={`/store-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-store/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
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

export default StoreList;
