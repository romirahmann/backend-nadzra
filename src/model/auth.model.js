const db = require("./../database/db.config");

login = async (id, password) =>
  await db.select(
    db.raw(
      `
    u.user_id,
    u.username,
    u.karyawan_id,
    u.password,
    u.role_id,
    ur.role_name,
    ur.role_desc
    FROM user AS u
    JOIN user_role AS ur ON (u.role_id = ur.role_id)
    WHERE u.karyawan_id = ${id} AND u.password = '${password}'
`
    )
  );

module.exports = {
  login,
};
