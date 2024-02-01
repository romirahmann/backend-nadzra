const db = require("./../database/db.config");

getAll = async () =>
  await db
    .select(
      "ap.approval_partner_id",
      "ap.approval_partner_desc",
      "ap.approval_admin_id",
      "ap.file_id as file_approval",
      "a.claim_id",
      "a.approval_admin_desc",
      "r.user_id",
      "r.payment_date",
      "r.description",
      "r.nominal",
      "r.file_id as file_proof",
      "r.status_code"
    )
    .from("approval_partner as ap")
    .join("approve_admin as a", "a.approval_admin_id", "ap.approval_admin_id")
    .leftJoin("reimbursement as r", "r.claim_id", "a.claim_id");

addApproval = async (data) => await db("approval_partner").insert(data);

module.exports = {
  getAll,
  addApproval,
};
