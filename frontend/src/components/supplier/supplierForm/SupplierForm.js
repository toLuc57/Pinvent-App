import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import StatusDropdown from "../../status/v2/StatusDropdown";

import "./SupplierForm.scss";

const SupplierForm = ({
  supplier,
  handleInputChange,
  saveSupplier,
  isAdded
}) => {
  return (
    <div className="add-supplier">
      <Card cardClass={"card"}>
        <form onSubmit={saveSupplier}>
          
          <label htmlFor="name">Supplier Name:</label>
          <input
            id="name"
            type="text"
            placeholder="Supplier name"
            name="name"
            value={supplier?.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="phone">Supplier Phone:</label>
          <input
            id="phone"
            type="text"
            placeholder="Supplier Phone"
            name="phone"
            value={supplier?.phone}
            onChange={handleInputChange}
          />

          {isAdded ? (
            <>
              <label htmlFor="email">Supplier Email:</label>
              <input
                id="email"
                type="text"
                placeholder="Supplier Email"
                name="email"
                value={supplier?.email}
                onChange={handleInputChange}
                required
              />
            </>
          ) : (
          <>
            <label htmlFor="email">Supplier emails cannot be changed.</label>
            <input
              id="email"
              type="text"
              placeholder="Supplier Email"
              name="email"
              value={supplier?.email}
              disabled
            />
          </>
          )}

          <label htmlFor="status">Supplier Status:</label>
          <StatusDropdown statusCode={supplier?.status} handleStatusChange={handleInputChange}/>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Supplier
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SupplierForm;
