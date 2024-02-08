const model = require("../../model/user.model");
const api = require("../../tools/common");
const bcrypt = require("bcrypt");

getAllUser = async (req, res) => {
  let data = await model.getAll();
  return api.ok(res, data);
};
getUserByUserId = async (req, res) => {
  const userID = req.params.id;
  try {
    let data = await model.getByUserId(userID);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
updateUser = async (req, res) => {
  const userID = req.params.userID;
  const newData = req.body;
  try {
    let data = await model.update(userID, newData);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

addUser = async (req, res) => {
  const newUser = req.body;
  if (newUser && newUser.password && typeof newUser.password === "string") {
    try {
      const hashedPassword = await bcrypt.hash(newUser.password, 10);
      newUser.password = hashedPassword;

      let data = await model.insert(newUser);
      return api.ok(res, data);
    } catch {
      return api.error(res, "Error while adding user", 500);
    }
  }
};

module.exports = {
  getAllUser,
  getUserByUserId,
  addUser,
  updateUser,
};
