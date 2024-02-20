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
    .join("user_role as ur", "ur.role_id", "u.role_id")
    .where("u.isDeleted", 0);

getByUserId = async (id) => await db("user").where("user_id", id);

insert = async (data) => await db("user").insert(data);
update = async (id, data) => await db("user").where("user_id", id).update(data);

module.exports = {
  getAll,
  getByUserId,
  insert,
  update,
};
