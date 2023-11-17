import React from 'react';
import "./ItemSetsTable.scss"

const ItemSetsTable = ({ itemSets }) => {
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
          {itemSets.map((itemSet, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className='products'>
                <ul>
                  {itemSet.products.map((product, i) => (
                    <li key={i}>
                      <strong>Name:</strong> {product.name}, <strong>Price:</strong> ${product.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{itemSet.utility}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemSetsTable;
