const sequelize = require("./database");
const { QueryTypes } = require("sequelize");

async function selectAllUser() {
  let data = await sequelize.query("SELECT * FROM User ORDER BY firstName", {
    type: QueryTypes.SELECT,
  });
  //console.log(data);
  return data;
}
async function insertUser(user) {
  try {
    await sequelize.query(
      "INSERT INTO User(firstName, lastName, subtitle, email, avatarUrl) values (?, ?, ?, ?, ?);",
      {
        replacements: [
          user.firstName,
          user.lastName,
          user.subtitle,
          user.email,
          user.avatarUrl,
        ],
      }
    );
    console.log(`${user.firstName} ${user.lastName} - ${user.email} is successfully inserted`);
  } catch (e) {
    console.error(e);
  }
}

insertUser({
  firstName: "Alibaba",
  lastName: "AliGaGa",
  subtitle: "I Love you",
  email: "8115111@qq.com",
  avatarUrl: "http://www.qq.com",
});

module.exports = {
  selectAllUser,
};
