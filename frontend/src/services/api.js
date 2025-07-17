const API_BASE = "http://localhost:5000/api";

export const getUsers = async () => {
  const response = await fetch(`${API_BASE}/users`);
  if (!response.ok) {
    throw new Error("Error fetching users");
  }
  return response.json();
};

export const addUser = async (name) => {
  const response = await fetch(`${API_BASE}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Error adding user");
  }
  return response.json();
};

export const claimPoints = async (userId) => {
  const response = await fetch(`${API_BASE}/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!response.ok) {
    throw new Error("Error processing claim");
  }
  return response.json();
};

export const getClaimHistory = async () => {
  const response = await fetch(`${API_BASE}/claim-history`);
  if (!response.ok) {
    throw new Error("Error fetching claim history");
  }
  return response.json();
};
