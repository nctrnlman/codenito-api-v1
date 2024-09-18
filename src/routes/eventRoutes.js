const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, eventController.getEvents);
router.post("/", authMiddleware, eventController.createEvent);
router.delete("/:id", authMiddleware, eventController.deleteEvent);

module.exports = router;
