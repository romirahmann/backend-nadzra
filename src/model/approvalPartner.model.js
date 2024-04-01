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
      "r.status_code",
      "u.username",
      "u.karyawan_id",
      "u.role_id",
      "f.file_id",
      "f.filename",
      "ct.category_name",
      "cl.client_name"
    )
    .from("approval_partner as ap")
    .join("approve_admin as a", "a.approval_admin_id", "ap.approval_admin_id")
    .leftJoin("reimbursement as r", "r.claim_id", "a.claim_id")
    .leftJoin("user as u", "u.user_id", "r.user_id")
    .leftJoin("file_proof as f", "f.file_id", "r.file_id")
    .leftJoin("categories as ct", "r.category_id", "ct.category_id")
    .leftJoin("client as cl", "r.client_id", "cl.client_id");

addApproval = async (data) => await db("approval_partner").insert(data);
update = async (id, data) =>
  await db("approval_partner").where("approval_admin_id", id).update(data);

module.exports = {
  getAll,
  addApproval,
  update,
};
