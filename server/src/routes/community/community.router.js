const {
  httpInsertCommunity,
  httpSelectCommunitiesByUserId,
  httpSelectCommunityByCommunityId,
  httpSearchCommunityByName,
} = require("./community.controller");
const express = require("express");
const commRouter = express.Router();

commRouter.post('/insert-community', httpInsertCommunity)

commRouter.get('/get-all-communities', httpSelectCommunitiesByUserId)

commRouter.post('/get-community-by-community-id', httpSelectCommunityByCommunityId)

commRouter.post('/get-community-by-name', httpSearchCommunityByName)

module.exports = commRouter;