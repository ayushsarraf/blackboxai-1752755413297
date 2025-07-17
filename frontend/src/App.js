import React, { useState } from "react";
import UserList from "./components/UserList";
import AddUser from "./components/AddUser";
import Leaderboard from "./components/Leaderboard";
import "./App.css";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to trigger leaderboard refresh
  const handleDataUpdate = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container">
      <header>
        <h1>🏆 Leaderboard Dashboard</h1>
        <p>Claim random points and compete with others!</p>
      </header>
      
      <main className="main-content">
        <div className="user-actions">
          <UserList onUserUpdate={handleDataUpdate} />
          <AddUser onUserAdded={handleDataUpdate} />
        </div>
        
        <div className="leaderboard-section">
          <Leaderboard refreshTrigger={refreshTrigger} />
        </div>
      </main>
    </div>
  );
}

export default App;
