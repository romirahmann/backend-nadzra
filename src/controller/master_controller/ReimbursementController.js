const model = require("./../../model/reimbursement.model");
const api = require("./../../tools/common");

getAllReimbursement = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

getClaimById = async (req, res) => {
  const claimId = req.params.claimId;
  try {
    let data = await model.getById(claimId);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

updateClaim = async (req, res) => {
  const claimId = req.params.claimId;
  const newData = req.body;
  try {
    let data = await model.update(claimId, newData);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

addClaim = async (req, res) => {
  const newData = req.body;
  try {
    let data = await model.addClaim(newData);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

module.exports = {
  getAllReimbursement,
  getClaimById,
  updateClaim,
  addClaim,
};
