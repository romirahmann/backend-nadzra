const model = require("../../model/auth.model");
const { generateToken } = require("../../services/auth.service");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { karyawan_id, password } = req.body;

  if (!karyawan_id || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both ID and password." });
  }

  try {
    let user = await model.login(karyawan_id, password);
    if (!user.length > 0) {
      return res.status(401).json({ message: "Account not found!" });
    }
    // Menggunakan bcrypt.compare untuk memverifikasi password
    // const passwordMatch = await bcrypt.compare(password, user[0].password);
    // if (!passwordMatch) {
    //   return res.status(401).json({ message: "Invalid password!" });
    // }

    // Generate a JWT token and send it in the response
    const payload = {
      id: user.user_id,
      username: user.username,
      karyawan_id: user.karyawan_id,
      role_id: user.role_id,
      role_name: user.role_name,
      role_desc: user.desc,
    };

    const token = generateToken(payload);
    res.json({ token, userData: user });
  } catch {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Error during login." });
  }
};

module.exports = {
  login,
};
