import React, { useState, useEffect } from "react";
import { getUsers, claimPoints } from "../services/api";

const UserList = ({ onUserUpdate }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [awardInfo, setAwardInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClaim = async () => {
    if (!selectedUser) return;
    
    setLoading(true);
    setError("");
    setAwardInfo(null);
    
    try {
      const response = await claimPoints(selectedUser);
      setAwardInfo(response);
      
      await fetchUsers();
      
      if (onUserUpdate) {
        onUserUpdate();
      }
      
      setTimeout(() => {
        setAwardInfo(null);
      }, 3000);
      
    } catch (error) {
      console.error("Error claiming points:", error);
      setError("Failed to claim points. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="action-section">
      <h2>🎯 Claim Points</h2>
      
      <div>
        <label htmlFor="user-select" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
          Select User:
        </label>
        <select 
          id="user-select"
          value={selectedUser} 
          onChange={(e) => setSelectedUser(e.target.value)}
          disabled={loading}
        >
          <option value="">-- Choose a User --</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.totalPoints} points)
            </option>
          ))}
        </select>
      </div>

      <button 
        onClick={handleClaim} 
        disabled={!selectedUser || loading}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          gap: '8px'
        }}
      >
        {loading ? (
          <>
            <div className="loading"></div>
            Processing...
          </>
        ) : (
          "🎲 Claim Random Points"
        )}
      </button>

      {error && (
        <div className="message error">
          {error}
        </div>
      )}

      {awardInfo && (
        <div className="claim-info">
          🎉 Awarded {awardInfo.pointsAwarded} point(s) to {awardInfo.user.name}!
        </div>
      )}
    </div>
  );
};

export default UserList;
