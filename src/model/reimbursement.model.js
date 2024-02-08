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
      "f.filename",
      "ct.category_name",
      "cl.client_name"
    )
    .from("reimbursement as r")
    .join("user as u", "r.user_id", "u.user_id")
    .leftJoin("file_proof as f", "r.file_id", "f.file_id")
    .leftJoin("categories as ct", "r.category_id", "ct.category_id")
    .leftJoin("client as cl", "r.client_id", "cl.client_id");
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
      "f.filename",
      "ct.category_name",
      "cl.client_name"
    )
    .from("reimbursement as r")
    .join("user as u", "r.user_id", "u.user_id")
    .leftJoin("file_proof as f", "r.file_id", "f.file_id")
    .leftJoin("categories as ct", "r.category_id", "ct.category_id")
    .leftJoin("client as cl", "r.client_id", "cl.client_id")
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
      "f.filename",
      "ct.category_name",
      "cl.client_name"
    )
    .from("reimbursement as r")
    .join("user as u", "u.user_id", "r.user_id")
    .leftJoin("file_proof as f", "f.file_id", "r.file_id")
    .leftJoin("categories as ct", "r.category_id", "ct.category_id")
    .leftJoin("client as cl", "r.client_id", "cl.client_id")
    .where("r.claim_id", id);

update = async (id, data) =>
  await db("reimbursement").where("claim_id", id).update(data);

addClaim = async (data) => await db("reimbursement").insert(data);

getClaimByMonthYear = async (month, year) => {
  const data = await db("reimbursement")
    .select("reimbursement.*", "fp.filename")
    .leftJoin("file_proof as fp", "fp.file_id", "reimbursement.file_id")
    .whereRaw("MONTH(payment_date) = ?", [month])
    .andWhereRaw("YEAR(payment_date) = ?", [year])
    .andWhere("status_code", "AP");

  const totalNominal = await db("reimbursement")
    .sum("nominal as totalNominal")
    .whereRaw("MONTH(payment_date) = ?", [month])
    .andWhereRaw("YEAR(payment_date) = ?", [year])
    .andWhere("status_code", "AP");

  return { data, totalNominal: totalNominal[0].totalNominal };
};

module.exports = {
  getAll,
  getAllByUserId,
  getById,
  update,
  addClaim,
  getClaimByMonthYear,
};
