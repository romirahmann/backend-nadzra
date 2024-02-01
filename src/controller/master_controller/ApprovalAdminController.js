const model = require("../../model/approvalAdmin.model");
const api = require("../../tools/common");

getAllAprovalAdmin = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

addApproval = async (req, res) => {
  const newData = req.body;
  try {
    let data = await model.addApproval(newData);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};
updateApproval = async (req, res) => {
  const newData = req.body;
  const approvalId = req.params.approvalId;
  try {
    let data = await model.updateApproval(approvalId, newData);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

module.exports = {
  getAllAprovalAdmin,
  addApproval,
  updateApproval,
};
