const {
  insertCommunity,
  selectCommunitiesByUserId,
  selectCommunityByCommunityId,
  searchCommunityByName,
  updateCommunityByCommunityId,
  insertCommunityNote
} = require("../../models/community.sql");

const {
  insertMembership,
  selectMembersByCommunityId,
  deleteMembership,
  alterMembershipRole,
} = require("../../models/membership.sql");

async function httpInsertCommunity(req, res) {
  const newInfo = req.body;
  newInfo.ownerId = req.userId;
  newInfo.createdAt = Date.now();

  if (!newInfo.name || !newInfo.description || !newInfo.photo) {
    return res.status(400).json({ error: "Missing info" });
  }

  try {
    return res.status(201).json(await insertCommunity(newInfo));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpSelectCommunitiesByUserId(req, res) {
  try {
    return res.status(200).json(await selectCommunitiesByUserId(req.userId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpSelectCommunityByCommunityId(req, res) {
  try {
    return res
      .status(200)
      .json(await selectCommunityByCommunityId(req.body.communityId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpSearchCommunityByName(req, res) {
  try {
    return res.status(200).json(await searchCommunityByName(req.body.name));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpUpdateCommunity(req, res) {
  const newComm = req.body;
  if (newComm.ownerId != req.userId) {
    return res.status(400).json({
      error: "You are not the owner, you cannot edit the community info.",
    });
  }

  try {
    return res.status(200).json(await updateCommunityByCommunityId(newComm));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

/* Below is Community function */
async function httpInsertMembership(req, res) {
  const newInfo = req.body;
  try {
    return res.status(201).json(await insertMembership(newInfo));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpSelectMembersByCommunityId(req, res) {
  try {
    return res
      .status(200)
      .json(await selectMembersByCommunityId(req.body.communityId));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpDeleteMembership(req, res) {
  try {
    return res
      .status(204)
      .json(await deleteMembership(req.body));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}
async function httpAlterMembershipRole(req, res) {
  const info = req.body;
  try {
    return res.status(200).json(await alterMembershipRole(info));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

async function httpInsertCommunityNote(req, res) {
  const newInfo = req.body;
  try {
    return res.status(201).json(await insertCommunityNote(newInfo));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
}

module.exports = {
  httpInsertCommunity,
  httpSelectCommunitiesByUserId,
  httpSelectCommunityByCommunityId,
  httpSearchCommunityByName,
  httpUpdateCommunity,
  httpSelectMembersByCommunityId,
  httpInsertMembership,
  httpDeleteMembership,
  httpAlterMembershipRole,
  httpInsertCommunityNote
};
