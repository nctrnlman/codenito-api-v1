const express = require("express");
const eventController = require("../controllers/eventController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.get("/", eventController.getAllEvents);
router.get("/:id", eventController.getEventById);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);

module.exports = router;