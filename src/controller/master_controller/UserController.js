const model = require("../../model/user.model");
const api = require("../../tools/common");

getAllUser = async (req, res) => {
  let data = await model.getAll();
  return api.ok(res, data);
};

addUser = async (req, res) => {
  const newData = req.body;
  try {
    let data = await model.insert(newData);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error", 500);
  }
};

module.exports = {
  getAllUser,
  addUser,
};
