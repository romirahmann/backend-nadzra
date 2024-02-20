const db = require("./../database/db.config");

login = async (id) =>
  await db
    .select(
      "u.user_id",
      "u.username",
      " u.karyawan_id",
      "u.password",
      "u.role_id",
      "ur.role_name",
      " ur.role_desc"
    )
    .from("user as u")
    .join("user_role as ur", "ur.role_id", "u.role_id")
    .where("u.karyawan_id", id);

module.exports = {
  login,
};
