const path = require("path");
const fs = require("fs");

const modelFile = require("./../../model/file.model");

const uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: true,
      message: "No file uploaded",
    });
  }

  const newFileName = req.file.filename;
  const dataFile = {
    filename: newFileName,
  };

  try {
    await modelFile.addFile(dataFile);

    // Dapatkan file_id dari file terbaru
    const latestFileId = await modelFile.getLatestFileId();

    return res.status(200).json({
      error: false,
      message: "File uploaded successfully",
      filename: newFileName,
      file_id: latestFileId, // Menggunakan file_id yang didapatkan dari getLatestFileId
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

const getFile = async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../../../uploads", filename);
  res.sendFile(filePath);
};

const deleteFile = async (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../../../uploads", filename);

  try {
    await fs.promises.access(filePath, fs.constants.F_OK);
    await fs.promises.unlink(filePath);
    res
      .status(200)
      .json({ error: false, message: "File deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: true, message: "File not found" });
  }
};

module.exports = { uploadFile, getFile, deleteFile };
