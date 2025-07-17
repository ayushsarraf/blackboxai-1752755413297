const db = require("../data");

exports.getUsers = async (req, res) => {
  try {
    const users = db.findUsers({ totalPoints: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const newUser = db.createUser({ name });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding user" });
  }
};

exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const user = db.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Generate random points (1 to 10)
    const pointsAwarded = Math.floor(Math.random() * 10) + 1;
    const updatedUser = db.updateUser(userId, { 
      totalPoints: user.totalPoints + pointsAwarded 
    });

    // Log claim history
    db.createClaimHistory({ userId, pointsAwarded });

    res.status(200).json({ message: "Points claimed", pointsAwarded, user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing claim" });
  }
};

exports.getClaimHistory = async (req, res) => {
  try {
    const history = db.findClaimHistory();
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching claim history" });
  }
};
