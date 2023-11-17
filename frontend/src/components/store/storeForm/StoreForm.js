import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import StatusDropdown from "../../status/v2/StatusDropdown";

import "./StoreForm.scss";

const StoreForm = ({
  store,
  handleInputChange,
  saveStore,
}) => {
  return (
    <div className="add-store">
      <Card cardClass={"card"}>
        <form onSubmit={saveStore}>
          
          <label htmlFor="name">Store Name:</label>
          <input
            type="text"
            placeholder="Store name"
            name="name"
            id="name"
            value={store?.name}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="phone">Store Phone:</label>
          <input
            type="text"
            placeholder="Store Phone"
            name="phone"
            id="phone"
            value={store?.phone}
            onChange={handleInputChange}
          />

          <label htmlFor="location">Store Location:</label>
          <input
            type="text"
            placeholder="Store Location"
            name="location"
            id="location"
            value={store?.location}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="state">Store State:</label>
          <input
            type="text"
            placeholder="Store State"
            name="state"
            id="state"
            value={store?.state}
            onChange={handleInputChange}
          />

          <label>Store Status:</label>
          <StatusDropdown statusCode={store?.status} handleStatusChange={handleInputChange}/>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Store
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default StoreForm;
