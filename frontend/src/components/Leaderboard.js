import React, { useState, useEffect } from "react";
import { getUsers } from "../services/api";

const Leaderboard = ({ refreshTrigger }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await getUsers();
      setUsers(data);
      setError("");
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setError("Failed to load leaderboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [refreshTrigger]);

  const getRankClass = (rank) => {
    if (rank === 1) return "rank-1";
    if (rank === 2) return "rank-2";
    if (rank === 3) return "rank-3";
    return "";
  };

  const getRankEmoji = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  if (loading) {
    return (
      <div className="card">
        <h2>🏆 Leaderboard</h2>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div className="loading" style={{ margin: '0 auto' }}></div>
          <p style={{ marginTop: '10px' }}>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2>🏆 Leaderboard</h2>
        <div className="message error">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>🏆 Leaderboard</h2>
      
      {users.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>No users found. Add some users to get started!</p>
        </div>
      ) : (
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              const rank = index + 1;
              return (
                <tr key={user._id}>
                  <td className={`rank-cell ${getRankClass(rank)}`}>
                    {getRankEmoji(rank)}
                  </td>
                  <td style={{ fontWeight: '500' }}>
                    {user.name}
                  </td>
                  <td className="points-cell">
                    {user.totalPoints}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        background: '#f8f9fa', 
        borderRadius: '8px',
        fontSize: '0.875rem',
        color: '#666',
        textAlign: 'center'
      }}>
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Leaderboard;
