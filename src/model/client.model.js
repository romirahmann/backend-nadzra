const db = require("./../database/db.config");

getAll = async () => await db.select("*").where("isDeleted", 0).from("client");
getById = async (id) => await db("client").where("client_id", id);
insert = async (data) => await db("client").insert(data);
update = async (id, data) =>
  await db("client").where("client_id", id).update(data);

module.exports = {
  getAll,
  getById,
  insert,
  update,
};
