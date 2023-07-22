const express = require("express");
const toolsController = require("../../controllers/tools.controller");
const viewCount = require("../../middleware/viewCount");
const limiter = require("../../middleware/limiter");
const router = express.Router();

router.route("/")
.get(toolsController.getAllTools)

.post(toolsController.postTools)

router
.route("/:id")
.get(viewCount,limiter,toolsController.getAllToolsDetails)
.patch(toolsController.updateTools)
.delete(toolsController.deleteTools)


module.exports = router;