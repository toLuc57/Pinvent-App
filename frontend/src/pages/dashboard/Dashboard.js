import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import ItemSetsTable from "../../components/itemsets/ItemSetsTable";
import { BACKEND_URL } from "../../services/authService";
import "./Dashboard.scss";

const Dashboard = () => {
  const [itemSets, setItemSets] = useState([]);
  const [minUtility, setMinUtility] = useState(30);
  const [loading, setLoading] = useState(true);

  const handleSendRequest = async (e) => {
    try {
      e.preventDefault();
      console.log(minUtility)
      const response = await axios.get(`${BACKEND_URL}/api/huis?minUtility=${minUtility}`);
      console.log(response.data)
      setItemSets(response.data);
      setLoading(false);
      toast.success(response.data.message);
      // Handle the response as needed
    } catch (error) {
      console.error('Error sending request:', error);
      toast.error(error.message);
      setLoading(false);
      // Handle errors
    }
  };

  return (
    <div className="dashboard">    
      <h2>Set Min Utility</h2>
      <div className='formInput'>
        <label htmlFor='minUtility'>
          Min Utility:          
        </label>
        <input
            id="minUtility"
            type="number"
            value={minUtility}
            min={0}
            onChange={(e) => setMinUtility(e.target.value)}
          />
        <button type="submit" onClick={handleSendRequest}>Send Request</button>
      </div>

      {loading ? (
        <>
          <p>Loading... Data not available yet, please check input information and related things</p>
        </>
      ) : itemSets.length > 0 ? (
        <>
          <ItemSetsTable itemSets={itemSets} />
        </>
      ) : (
        <>
          <p>No item sets available.</p>
        </>
      )}
      
    </div>
  );
};

export default Dashboard;
