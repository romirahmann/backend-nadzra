const model = require("../../model/approvalPartner.model");
const api = require("../../tools/common");

getAllApprovalPartner = async (req, res) => {
  try {
    let data = await model.getAll();
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

addAproval = async (req, res) => {
  const newData = req.body;
  try {
    let data = await model.addApproval(newData);
    return api.ok(res, data);
  } catch {
    return api.error(res, "Internal Server Error");
  }
};

module.exports = {
  getAllApprovalPartner,
  addAproval,
};
