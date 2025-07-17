// Simple in-memory database for demonstration
let users = [
  { _id: '1', name: 'Rahul', totalPoints: 0, createdAt: new Date(), updatedAt: new Date() },
  { _id: '2', name: 'Kamal', totalPoints: 0, createdAt: new Date(), updatedAt: new Date() },
  { _id: '3', name: 'Sanak', totalPoints: 0, createdAt: new Date(), updatedAt: new Date() },
  { _id: '4', name: 'Priya', totalPoints: 0, createdAt: new Date(), updatedAt: new Date() },
  { _id: '5', name: 'Amit', totalPoints: 0, createdAt: new Date(), updatedAt: new Date() },
  { _id: '6', name: 'Neha', totalPoints: 0, createdAt: new Date(), updatedAt: new Date() },
  { _id: '7', name: 'Vikram', totalPoints: 0, createdAt: new Date(), updatedAt: new Date() },
  { _id: '8', name: 'Anjali', totalPoints: 0, createdAt: new Date(), updatedAt: new Date() },
  { _id: '9', name: 'Rohit', totalPoints: 0, createdAt: new Date(), updatedAt: new Date() },
  { _id: '10', name: 'Kavya', totalPoints: 0, createdAt: new Date(), updatedAt: new Date() }
];

let claimHistory = [];
let nextUserId = 11;
let nextClaimId = 1;

// Helper functions
const generateId = () => String(nextUserId++);
const generateClaimId = () => String(nextClaimId++);

// Database operations
const db = {
  // User operations
  findUsers: (sortBy = { totalPoints: -1 }) => {
    return [...users].sort((a, b) => {
      if (sortBy.totalPoints === -1) {
        return b.totalPoints - a.totalPoints;
      }
      return a.totalPoints - b.totalPoints;
    });
  },

  findUserById: (id) => {
    return users.find(user => user._id === id);
  },

  createUser: (userData) => {
    const newUser = {
      _id: generateId(),
      name: userData.name,
      totalPoints: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    users.push(newUser);
    return newUser;
  },

  updateUser: (id, updateData) => {
    const userIndex = users.findIndex(user => user._id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updateData, updatedAt: new Date() };
      return users[userIndex];
    }
    return null;
  },

  // Claim history operations
  createClaimHistory: (claimData) => {
    const newClaim = {
      _id: generateClaimId(),
      userId: claimData.userId,
      pointsAwarded: claimData.pointsAwarded,
      createdAt: new Date()
    };
    claimHistory.push(newClaim);
    return newClaim;
  },

  findClaimHistory: () => {
    return claimHistory.map(claim => ({
      ...claim,
      userId: { 
        _id: claim.userId, 
        name: users.find(u => u._id === claim.userId)?.name || 'Unknown' 
      }
    })).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

module.exports = db;
