const express = require("express");
const clientController = require("../controllers/clientController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.get("/", clientController.listClients);
router.get("/:id", clientController.getClient);
router.post("/", clientController.createClient);
router.put("/:id", clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

module.exports = router;