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
getClaimByUserId = async (req, res) => {
  const userID = req.params.userID;
  try {
    let data = await model.getAllByUserId(userID);
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

getClaimByMonthYear = async (req, res) => {
  const { month, year } = req.params;
  try {
    const data = await model.getClaimByMonthYear(month, year);
    return api.ok(res, data);
  } catch (error) {
    return api.error(res, "Internal Server Error");
  }
};

module.exports = {
  getAllReimbursement,
  getClaimById,
  updateClaim,
  addClaim,
  getClaimByUserId,
  getClaimByMonthYear,
};
