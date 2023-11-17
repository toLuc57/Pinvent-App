import React from "react";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import StatusDropdown from "../../status/v2/StatusDropdown";

import "./StaffForm.scss";

const StaffForm = ({
  staff,
  handleInputChange,
  saveStaff,
  isAdded
}) => {
  return (
    <div className="add-staff">
      <Card cardClass={"card"}>
        <form onSubmit={saveStaff}>
          
          <label>Staff Name:</label>
          <input
            type="text"
            placeholder="Staff name"
            name="name"
            value={staff?.name}
            onChange={handleInputChange}
            required
          />

          <label>Staff Phone:</label>
          <input
            type="text"
            placeholder="Staff Phone"
            name="phone"
            value={staff?.phone}
            onChange={handleInputChange}
          />
          {isAdded ? (
            <>
              <label>Staff Email</label>
              <input
                type="text"
                placeholder="Staff Email"
                name="email"
                value={staff?.email}
                onChange={handleInputChange}
                required
              />
            </>
          ) : (
            <>
              <label>Staff emails cannot be changed.</label>
              <input
                type="text"
                placeholder="Staff Email"
                name="email"
                value={staff?.email}
                disabled
              />
            </>
          )}
          

          <label>Staff Status:</label>
          <StatusDropdown statusCode={staff?.status} handleStatusChange={handleInputChange}/>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Staff
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default StaffForm;
