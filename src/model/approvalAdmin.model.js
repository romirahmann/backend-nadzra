const db = require("./../database/db.config");

getAll = async () =>
  await db
    .select(
      "ap.approval_admin_id",
      "ap.claim_id",
      "ap.approval_admin_desc",
      "r.user_id",
      "r.payment_date",
      "r.description",
      "r.nominal",
      "r.file_id",
      "r.status_code",
      "u.username",
      "u.karyawan_id",
      "u.role_id",
      "f.file_id",
      "f.filename"
    )
    .from("approve_admin as ap")
    .join("reimbursement as r", "r.claim_id", "ap.claim_id")
    .leftJoin("user as u", "u.user_id", "r.user_id")
    .leftJoin("file_proof as f", "f.file_id", "r.file_id");
getById = async (claimId) =>
  await db
    .select(
      "ap.approval_admin_id",
      "ap.claim_id",
      "ap.approval_admin_desc",
      "r.user_id",
      "r.payment_date",
      "r.description",
      "r.nominal",
      "r.file_id",
      "r.status_code",
      "u.username",
      "u.karyawan_id",
      "u.role_id",
      "f.file_id",
      "f.filename",
      "ur.role_name",
      "s.status_desc"
    )
    .from("approve_admin as ap")
    .join("reimbursement as r", "r.claim_id", "ap.claim_id")
    .leftJoin("user as u", "u.user_id", "r.user_id")
    .leftJoin("file_proof as f", "f.file_id", "r.file_id")
    .leftJoin("user_role as ur", "ur.role_id", "u.role_id")
    .leftJoin("status as s", "s.status_code", "r.status_code")
    .where("ap.claim_id", claimId);

addApproval = async (data) => await db("approve_admin").insert(data);
updateApproval = async (id, data) =>
  await db("approve_admin").where("approval_admin_id", id).update(data);

module.exports = {
  getAll,
  getById,
  addApproval,
  updateApproval,
};
