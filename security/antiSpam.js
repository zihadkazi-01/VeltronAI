const spamMap = {};

function checkSpam(user) {
  const now = Date.now();

  if (!spamMap[user]) {
    spamMap[user] = { count: 1, time: now };
    return false;
  }

  if (now - spamMap[user].time < 3000) {
    spamMap[user].count++;
    if (spamMap[user].count > 5) return true;
  } else {
    spamMap[user] = { count: 1, time: now };
  }

  return false;
}

module.exports = checkSpam;
