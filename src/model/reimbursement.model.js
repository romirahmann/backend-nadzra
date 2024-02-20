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
      "cl.client_name",
      "ap.approval_partner_desc as note_partner"
    )
    .from("reimbursement as r")
    .join("user as u", "r.user_id", "u.user_id")
    .leftJoin("file_proof as f", "r.file_id", "f.file_id")
    .leftJoin("categories as ct", "r.category_id", "ct.category_id")
    .leftJoin("client as cl", "r.client_id", "cl.client_id")
    .leftJoin("approve_admin as aa", "aa.claim_id", "r.claim_id")
    .leftJoin(
      "approval_partner as ap",
      "ap.approval_admin_id",
      "aa.approval_admin_id"
    )
    .where("r.user_id", userID)
    .andWhere("r.is_deleted", 0);

getAllByCategory = async (userID, category_id) =>
  await db
    .select(
      "r.claim_id",
      "r.user_id",
      "r.payment_date",
      "r.description",
      "r.nominal",
      "r.file_id",
      "r.status_code",
      "r.category_id",
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
    .where("r.user_id", userID)
    .andWhere("r.category_id", category_id);

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
    .select("reimbursement.*", "fp.filename", "c.client_name")
    .leftJoin("file_proof as fp", "fp.file_id", "reimbursement.file_id")
    .leftJoin("client as c", "c.client_id", "reimbursement.client_id")
    .whereRaw("MONTH(payment_date) = ?", [month])
    .andWhereRaw("YEAR(payment_date) = ?", [year])
    .andWhere("status_code", "AP")
    .orderByRaw("CASE WHEN category_id = 1 THEN 0 ELSE 1 END");

  const totalNominal = await db("reimbursement")
    .sum("nominal as totalNominal")
    .whereRaw("MONTH(payment_date) = ?", [month])
    .andWhereRaw("YEAR(payment_date) = ?", [year])
    .andWhere("status_code", "AP")
    .orderByRaw("CASE WHEN category_id = 1 THEN 0 ELSE 1 END");

  return { data, totalNominal: totalNominal[0].totalNominal };
};

getTotalClaimEmployee = async (id) => {
  const resultClaim = await db("reimbursement as r")
    .select("r.*")
    .count("r.claim_id as totalClaims")
    .where("r.user_id", id);
  const resultApproval = await db("reimbursement as r")
    .select("r.*")
    .count("r.claim_id as totalClaimApprove")
    .where("r.user_id", id)
    .andWhere("r.status_code", "AP");
  const resultDeclinePartner = await db("reimbursement as r")
    .select("r.*")
    .count("r.claim_id as totalClaimDeclinePartner")
    .where("r.user_id", id)
    .andWhere("r.status_code", "TP");
  const resultDeclineAdmin = await db("reimbursement as r")
    .select("r.*")
    .count("r.claim_id as totalClaimDeclineAdmin")
    .where("r.user_id", id)
    .andWhere("r.status_code", "TA");

  return {
    totalClaims: resultClaim[0].totalClaims,
    totalClaimApprove: resultApproval[0].totalClaimApprove,
    totalClaimDeclinePartner: resultDeclinePartner[0].totalClaimDeclinePartner,
    totalClaimDeclineAdmin: resultDeclineAdmin[0].totalClaimDeclineAdmin,
  };
};
getTotalClaimAdmin = async () => {
  const resultClaim = await db("approve_admin as a")
    .select("a.*", "r.claim_id", "r.status_code")
    .join("reimbursement as r", "r.claim_id", "a.claim_id")
    .count("a.approval_admin_id as totalClaims");
  const resultApproval = await db("approve_admin as a")
    .select("a.*", "r.claim_id", "r.status_code")
    .join("reimbursement as r", "r.claim_id", "a.claim_id")
    .count("a.approval_admin_id as totalClaimApprove")
    .where("r.status_code", "AA");
  const resultDeclineAdmin = await db("approve_admin as a")
    .select("a.*", "r.claim_id", "r.status_code")
    .join("reimbursement as r", "r.claim_id", "a.claim_id")
    .count("a.approval_admin_id as totalClaimDeclineAdmin")
    .where("r.status_code", "TA");
  const resultDeclinePartner = await db("approve_admin as a")
    .select("a.*", "r.claim_id", "r.status_code")
    .join("reimbursement as r", "r.claim_id", "a.claim_id")
    .count("a.approval_admin_id as totalClaimDeclinePartner")
    .where("r.status_code", "TP");
  return {
    totalClaims: resultClaim[0].totalClaims,
    totalClaimApprove: resultApproval[0].totalClaimApprove,
    totalClaimDeclinePartner: resultDeclinePartner[0].totalClaimDeclinePartner,
    totalClaimDeclineAdmin: resultDeclineAdmin[0].totalClaimDeclineAdmin,
  };
};
getTotalClaimPartner = async () => {
  const resultClaim = await db("approval_partner").count(
    "approval_partner_id as totalClaims"
  );
  const resultApproval = await db("approval_partner")
    .select("approval_partner.*", "a.claim_id", "r.status_code")
    .join(
      "approve_admin as a",
      "approval_partner.approval_admin_id",
      "a.approval_admin_id"
    )
    .leftJoin("reimbursement as r", "a.claim_id", "r.claim_id")
    .count("approval_partner_id as totalClaimApprove")
    .where("r.status_code", "AP");
  const resultDeclinePartner = await db("approval_partner")
    .select("approval_partner.*", "a.claim_id", "r.status_code")
    .join(
      "approve_admin as a",
      "approval_partner.approval_admin_id",
      "a.approval_admin_id"
    )
    .leftJoin("reimbursement as r", "a.claim_id", "r.claim_id")
    .count("approval_partner_id as totalClaimDeclinePartner")
    .where("r.status_code", "TP");
  const resultDeclineAdmin = await db("approval_partner")
    .select("approval_partner.*", "a.claim_id", "r.status_code")
    .join(
      "approve_admin as a",
      "approval_partner.approval_admin_id",
      "a.approval_admin_id"
    )
    .leftJoin("reimbursement as r", "a.claim_id", "r.claim_id")
    .count("approval_partner_id as totalClaimDeclineAdmin")
    .where("r.status_code", "TP");
  return {
    totalClaims: resultClaim[0].totalClaims,
    totalClaimApprove: resultApproval[0].totalClaimApprove,
    totalClaimDeclinePartner: resultDeclinePartner[0].totalClaimDeclinePartner,
    totalClaimDeclineAdmin: resultDeclineAdmin[0].totalClaimDeclineAdmin,
  };
};

module.exports = {
  getAll,
  getAllByUserId,
  getAllByCategory,
  getById,
  update,
  addClaim,
  getClaimByMonthYear,
  getTotalClaimAdmin,
  getTotalClaimEmployee,
  getTotalClaimPartner,
};
