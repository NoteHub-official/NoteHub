const sequelize = require("./database");
const { QueryTypes } = require("sequelize");

//CREATE Membership
async function insertMembership(info) {
  try {
    //Set a default role to "owner"
    if (
      info.role != "member" ||
      info.role != "manager" ||
      info.role != "owner"
    ) {
      info.role = "member";
    }
    await sequelize.query(
      `INSERT INTO Membership(communityId, userId, role) values ('${info.communityId}', '${info.userId}', '${info.role}')`,
      {
        type: QueryTypes.INSERT,
      }
    );
    console.log(
      `${info.communityId} - ${info.userId} with role ${info.role} is successfully inserted`
    );
    console.log(user);
    return `${info.communityId} - ${info.userId} with role ${info.role} is successfully inserted`;
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

    console.log(
      `${info.communityId} with user ${info.userId} membership is successfully deleted`
    );
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
