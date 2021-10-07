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
      `INSERT INTO Community(name, description, createdAt, photo, ownerId) values ('${communityInfo.name}', '${communityInfo.description}', ${communityInfo.createdAt}, '${communityInfo.photo}', '${communityInfo.ownerId}')`,
      {
        type: QueryTypes.INSERT,
      }
    );
    const raw = await selectCommunityByNameAndOwnerId({
      name: communityInfo.name,
      ownerId: communityInfo.ownerId,
    });
    const newComm = raw[0];
    await sequelize.query(
      `INSERT INTO Membership(communityId, userId, role) VALUES ('${newComm.communityId}', '${newComm.ownerId}', 'owner')`,
      {
        type: QueryTypes.INSERT,
      }
    );
    console.log(`${communityInfo.name} is successfully inserted`);
    return newComm;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}

//SELECT Community By community name and ownnerId uniquely
async function selectCommunityByNameAndOwnerId(info) {
  try {
    const data = await sequelize.query(
      `SELECT * FROM Community WHERE name = '${info.name}' AND ownerId = '${info.ownerId}'`,
      {
        type: QueryTypes.SELECT,
      }
    );
    console.log(data);
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
}

//SELECT Community By id
async function selectCommunityByCommunityId(commId) {
  try {
    let data = await sequelize.query(
      `SELECT * FROM Community WHERE communityId = '${commId}'`,
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
    throw new Error("selectCommunityById: Unknown DB failure");
  }
}

//SELECT Communities by userId who is a member of
async function selectCommunitiesByUserId(userId) {
  try {
    const data = await sequelize.query(
      `SELECT *
      FROM Community C
      JOIN User U ON (U.userId = C.ownerId)
      WHERE C.communityId IN (SELECT M.communityId FROM Membership M WHERE M.userId = '${userId}')`,
      {
        type: QueryTypes.SELECT,
      }
    );
    return data.map((community) => {
      return {
        communityId: community.communityId,
        name: community.name,
        description: community.description,
        createdAt: community.createdAt,
        photo: community.photo,
        memberCount: community.memberCount,
        owner: {
          userId: community.userId,
          firstName: community.firstName,
          lastName: community.lastName,
          subtitle: community.subtitle,
          email: community.email,
          avatarUrl: community.avatarUrl,
        },
      };
    });
  } catch (e) {
    throw new Error(e.message);
  }
}

async function searchCommunityByName(name) {
  try {
    return await sequelize.query(
      `SELECT * FROM Community WHERE name LIKE '%${name}%')`,
      {
        type: QueryTypes.SELECT,
      }
    );
  } catch (e) {
    throw new Error(e.message);
  }
}

// UPDATE Community
async function updateCommunityByCommunityId(newCommInfo) {
  try {

    await sequelize.query(
      `UPDATE Community
        SET name = '${newCommInfo.name}', description = '${newCommInfo.description}', photo = '${newCommInfo.photo}, memberCount = ${newCommInfo.memberCount}
        WHERE communityId = ${newCommInfo.communityId}`,
      {
        type: QueryTypes.UPDATE,
      }
    );

    console.log(`${newCommInfo.name} is successfully updated`);

    // Return the updated information
    return newCommInfo
  } catch (e) {
    throw new Error(e.message);
  }
}

async function insertCommunityNote(info) {
  try {
    await sequelize.query(
      `INSERT INTO CommunityNote(communityId, noteId) values (${info.communityId}, ${info.noteId})`,
      {
        type: QueryTypes.INSERT,
      }
    );
    console.log(`Community: ${info.communityId}: Note ${info.noteId} is successfully inserted`);
    return info;
  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }

}

module.exports = {
  insertCommunity,
  selectCommunityByNameAndOwnerId,
  selectCommunitiesByUserId,
  selectCommunityByCommunityId,
  searchCommunityByName,
  updateCommunityByCommunityId,
  insertCommunityNote
};
