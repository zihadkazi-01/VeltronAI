const ADMINS = ["YOUR_FACEBOOK_ID"];

function isAdmin(userID) {
  return ADMINS.includes(userID);
}

module.exports = isAdmin;
