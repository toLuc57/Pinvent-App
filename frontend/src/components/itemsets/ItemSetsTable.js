import React, { useEffect, useState } from 'react';
import "./ItemSetsTable.scss";
import ReactPaginate from "react-paginate";

const ItemSetsTable = ({ itemSets }) => {
  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(itemSets.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(itemSets.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, itemSets]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % itemSets.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  return (
    <div className='itemsets'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Products</th>
            <th>Utility</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((itemSet, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className='products'>
                <ul>
                  {itemSet.products.map((product, i) => (
                    <li key={i}>
                      <strong>Name:</strong> {product ? product.name : "Default item"}, 
                      <strong>Price:</strong> ${product ? product.price : (itemSet.utility / 76) }
                    </li>
                  ))}
                </ul>
              </td>
              <td>{itemSet.utility}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
  );
};

export default ItemSetsTable;
