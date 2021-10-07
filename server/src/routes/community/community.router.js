const {
  httpInsertCommunity,
  httpSelectCommunitiesByUserId,
  httpSelectCommunityByCommunityId,
  httpSearchCommunityByName,
  httpUpdateCommunity,
  httpSelectMembersByCommunityId,
  httpInsertMembership,
  httpDeleteMembership,
  httpAlterMembershipRole,
} = require("./community.controller");

const express = require("express");

const commRouter = express.Router();

commRouter.post("/insert-community", httpInsertCommunity);

commRouter.get("/get-all-communities", httpSelectCommunitiesByUserId);

commRouter.post(
  "/get-community-by-community-id",
  httpSelectCommunityByCommunityId
);

commRouter.post("/search-community-by-name", httpSearchCommunityByName);

commRouter.post("/update-community", httpUpdateCommunity);

commRouter.post("/get-members-by-community-id", httpSelectMembersByCommunityId);

commRouter.post("/insert-membership", httpInsertMembership);

commRouter.post("/delete-membership", httpDeleteMembership);

commRouter.post("/alter-membership", httpAlterMembershipRole);

module.exports = commRouter;
