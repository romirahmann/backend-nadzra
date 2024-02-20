const db = require("./../database/db.config");

addFile = async (data) => await db("file_proof").insert(data);

const getLatestFileId = async () => {
  try {
    // Fungsi untuk mendapatkan file_id dari file terbaru
    const queryResult = await db
      .select("file_id")
      .from("file_proof")
      .orderBy("file_id", "desc")
      .limit(1);

    if (queryResult.length > 0) {
      return queryResult[0].file_id;
    } else {
      return 1;
    }
  } catch (error) {
    console.error("Error in getLatestFileId:", error);
    throw error; // Ganti dengan penanganan kesalahan yang sesuai
  }
};

module.exports = {
  addFile,
  getLatestFileId,
};
