const sequelize = require("./database");
const { QueryTypes } = require("sequelize");

// CREATE Community
async function insertCommunity(communityInfo) {
  try {
    communityExist = await selectCommunityByNameAndOwnerId({
      name: communityInfo.name,
      ownerId: communityInfo.ownerId,
    });
    if (communityExist.length > 0) {
      throw new Error("The user already created the community before.");
    }

    await sequelize.query(
      `INSERT INTO Community(name, description, createdAt, photo, ownerId) values ('${communityInfo.name}', '${communityInfo.description}', '${communityInfo.createdAt}', '${communityInfo.photo}', '${communityInfo.ownerId}')`,
      {
        type: QueryTypes.INSERT,
      }
    );
    console.log(`${communityInfo.name} is successfully inserted`);
    return await selectCommunityByNameAndOwnerId({
      name: communityInfo.name,
      ownerId: communityInfo.ownerId,
    });
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

//SELECT Community By community name and ownnerId uniquely
async function selectCommunityByNameAndOwnerId(info) {
  try {
    let data = await sequelize.query(
      `SELECT * FROM Community WHERE name = '${info.name}' AND ownerId = '${info.ownerId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    if (data.length > 0) {
      return data[0];
    } else {
      throw new Error("Cannot find matching Community");
    }
  } catch (e) {
    throw new Error("selectCommunityByNameAndOwnerId: Unknown DB failure");
  }
}

//SELECT Communities by userId who is a member of
async function selectCommunityByUserId(userId) {
  try {
    return await sequelize.query(
      `SELECT * FROM Community WHERE communityId IN (SELECT communityId FROM Membership WHERE userId = '${userId}')`,
      {
        type: QueryTypes.SELECT,
      }
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

module.exports = {
  insertCommunity,
  selectCommunityByNameAndOwnerId,
  selectCommunityByUserId,
};
