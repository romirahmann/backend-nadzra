const model = require("../../model/client.model");
const api = require("../../tools/common");

getAllClient = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    let data = await model.getById(id);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

addClient = async (req, res) => {
  const newData = req.body;
  try {
    let data = await model.insert(newData);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
updateClient = async (req, res) => {
  const clientID = req.params.id;
  const newData = req.body;
  try {
    let data = await model.update(clientID, newData);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

module.exports = {
  getAllClient,
  addClient,
  updateClient,
  getClientById,
};
