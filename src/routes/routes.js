var express = require("express");
var router = express.Router();
const path = require("path");

const masterRoutes = require("./master_routes/master.routes");
const auth_routes = require("./utility_routes/auth.routes");
const UploadController = require("./../controller/master_controller/UploadController");
const upload = require("./../../src/services/upload-file");

const { verifyToken, accessControl } = require("../services/auth.service");

// not found route
router.get("/not-found", function (req, res) {
  res.status(404).sendFile(path.join(__dirname, "../views/not-found.html"));
});

// authentication routes usage
router.use("/auth/", auth_routes);

// master data routes usage
router.use("/master/", accessControl, masterRoutes);

// Upload
router.get("/file/:filename", UploadController.getFile);
router.post("/upload", upload.single("file"), UploadController.uploadFile);
router.delete("/delete/:filename", UploadController.deleteFile);

//kecuali master, seharusnya routes dipisah per-table

module.exports = router;
