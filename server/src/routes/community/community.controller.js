const {
  insertCommunity,
  selectCommunitiesByUserId,
  selectCommunityByCommunityId,
  searchCommunityByName,
} = require("../../models/community.sql");

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

module.exports = {
  httpInsertCommunity,
  httpSelectCommunitiesByUserId,
  httpSelectCommunityByCommunityId,
  httpSearchCommunityByName,
};
