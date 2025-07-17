const express = require("express");
const router = express.Router();
const { getUsers, addUser, claimPoints, getClaimHistory } = require("../controllers/userController");

router.get("/users", getUsers);
router.post("/users", addUser);
router.post("/claim", claimPoints);
router.get("/claim-history", getClaimHistory);

module.exports = router;
