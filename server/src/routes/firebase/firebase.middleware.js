const admin = require("./firebase.initialize");

function getAuthToken(req, res, next) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
}

function checkIfAuthenticated(req, res, next) {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin.auth().verifyIdToken(authToken);
      req.userId = userInfo.uid;
      req.email = userInfo.email;
      console.log(`\n${req.email}, ${req.userId} is being authenticated\n`);
      next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
}

// function checkIfCurrentUser(req, email) {
//   console.log("currentUser:", req.email);
//   console.log("requestUser:", email);
//   if (email != req.email) {
//     return false;
//   }
//   return true;
// }

module.exports = { checkIfAuthenticated };
