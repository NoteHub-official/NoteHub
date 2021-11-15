const admin = require("./firebase.initialize");

function getAuthTokenFromHeader(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else {
    return null;
  }
}

const getUserInfoFromFirebase = async (authToken) => {
  try {
    return await admin.auth().verifyIdToken(authToken);
  } catch (error) {
    console.log(error);
    return { email: "Invalid" };
  }
};

module.exports = { getAuthTokenFromHeader, getUserInfoFromFirebase };
