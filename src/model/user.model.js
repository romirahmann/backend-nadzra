const db = require("../database/db.config");

getAll = async () =>
  await db
    .select(
      "u.user_id",
      "u.username",
      "u.karyawan_id",
      "u.password",
      "u.role_id",
      "ur.role_name",
      "ur.role_desc"
    )
    .from("user as u")
    .join("user_role as ur", "ur.role_id", "u.role_id");

insert = async (data) => await db("user").insert(data);

module.exports = {
  getAll,
  insert,
};
