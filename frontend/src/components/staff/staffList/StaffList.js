import React, { useEffect, useState } from "react";
import { SpinnerImg } from "../../loader/Loader";
import "./StaffList.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_STAFFS,
  selectFilteredStaffs,
} from "../../../redux/features/staff/filterSlice";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteStaff,
  getStaffs,
} from "../../../redux/features/staff/staffSlice";
import { Link } from "react-router-dom";
import Status from "../../status/v2/Status";

const StaffList = ({ staffs, isLoading }) => {
  const [search, setSearch] = useState("");
  const filteredStaffs = useSelector(selectFilteredStaffs);

  const dispatch = useDispatch();

  const delStaff = async (id) => {
    console.log(id);
    await dispatch(deleteStaff(id));
    await dispatch(getStaffs());
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Delete Staff",
      message: "Are you sure you want to delete this staff.",
      buttons: [
        {
          label: "Delete",
          onClick: () => delStaff(id),
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

    setCurrentItems(filteredStaffs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredStaffs.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredStaffs]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredStaffs.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_STAFFS({ staffs, search }));
  }, [staffs, search, dispatch]);

  return (
    <div className="staff-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Staffs</h3>
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
          {!isLoading && staffs.length === 0 ? (
            <p>-- No staff found, please add a staff...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((staff, index) => {
                  const { _id, name, phone, email, status } = staff;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{phone}</td>
                      <td>
                        {email}
                      </td>
                      <td><Status statusCode={status} /></td>
                      <td className="icons">
                        <span>
                          <Link to={`/staff-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-staff/${_id}`}>
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

export default StaffList;
