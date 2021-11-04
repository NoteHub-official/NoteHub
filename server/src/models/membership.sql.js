const sequelize = require("./database");
const { QueryTypes } = require("sequelize");

//CREATE Membership
async function insertMembership(info) {
  let insertTuples = [];
  info.forEach((item) => {
    insertTuples.push(`(${item.communityId}, '${item.userId}', '${item.role}')`);
  });
  const insertString = insertTuples.join(",");
  try {
    console.log(`INSERT IGNORE INTO Membership(communityId, userId, role) VALUES ${insertString}`);
    await sequelize.query(
      `INSERT IGNORE INTO Membership(communityId, userId, role) VALUES ${insertString}`,
      {
        type: QueryTypes.INSERT,
      }
    );

    return `Membership is successfully inserted`;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

//DELETE membership
async function deleteMembership(info) {
  try {
    await sequelize.query(
      `DELETE FROM Membership WHERE userId = '${info.userId}' AND communityId = '${info.communityId}'`,
      {
        type: QueryTypes.DELETE,
      }
    );

    console.log(`${info.communityId} with user ${info.userId} membership is successfully deleted`);
  } catch (e) {
    throw new Error(e.message);
  }
}

async function selectMembersByCommunityId(commId) {
  try {
    const data = await sequelize.query(
      `SELECT DISTINCT * FROM User NATURAL JOIN Membership WHERE communityId = '${commId}'`,
      { type: QueryTypes.SELECT }
    );
    const output = [
      {
        role: "Owner",
        icon: "psychology",
        users: [data.filter(({ role }) => role === "owner")],
      },
      {
        role: "Manager",
        icon: "manage_accounts",
        users: [data.filter(({ role }) => role === "manager")],
      },
      {
        role: "Member",
        icon: "groups",
        users: [data.filter(({ role }) => role === "member")],
      },
    ];
    return output;
  } catch (e) {
    throw new Error(e.message);
  }
}

async function alterMembershipRole(info) {
  try {
    await sequelize.query(
      `UPDATE Membership
        SET role = '${info.role}'
        WHERE communityId = ${info.communityId}, userId = '${info.userId}'`,
      {
        type: QueryTypes.UPDATE,
      }
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
  insertMembership,
  selectMembersByCommunityId,
  deleteMembership,
  alterMembershipRole,
};
