const db = require("./../database/db.config");

getAll = async () => await db.select("*").from("client");
insert = async (data) => await db("client").insert(data);

module.exports = {
  getAll,
  insert,
};
