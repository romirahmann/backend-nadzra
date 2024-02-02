const db = require("./../database/db.config");

getAll = async () =>
  await db
    .select(
      "r.claim_id",
      "r.user_id",
      "r.payment_date",
      "r.description",
      "r.nominal",
      "r.file_id",
      "r.status_code",
      "u.username",
      "u.karyawan_id",
      "u.password",
      "u.role_id",
      "f.file_id",
      "f.filename"
    )
    .from("reimbursement as r")
    .join("user as u", "r.user_id", "u.user_id")
    .leftJoin("file_proof as f", "r.file_id", "f.file_id");
getAllByUserId = async (userID) =>
  await db
    .select(
      "r.claim_id",
      "r.user_id",
      "r.payment_date",
      "r.description",
      "r.nominal",
      "r.file_id",
      "r.status_code",
      "u.username",
      "u.karyawan_id",
      "u.password",
      "u.role_id",
      "f.file_id",
      "f.filename"
    )
    .from("reimbursement as r")
    .join("user as u", "r.user_id", "u.user_id")
    .leftJoin("file_proof as f", "r.file_id", "f.file_id")
    .where("r.user_id", userID);

getById = async (id) =>
  await db
    .select(
      "r.claim_id",
      "r.user_id",
      "r.payment_date",
      "r.description",
      "r.nominal",
      "r.file_id",
      "r.status_code",
      "u.username",
      "u.karyawan_id",
      "u.password",
      "u.role_id",
      "f.file_id",
      "f.filename"
    )
    .from("reimbursement as r")
    .join("user as u", "u.user_id", "r.user_id")
    .leftJoin("file_proof as f", "f.file_id", "r.file_id")
    .where("r.claim_id", id);

update = async (id, data) =>
  await db("reimbursement").where("claim_id", id).update(data);

addClaim = async (data) => await db("reimbursement").insert(data);

module.exports = {
  getAll,
  getAllByUserId,
  getById,
  update,
  addClaim,
};
