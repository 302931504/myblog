function checkSession (req) {
  if (!req.session.user) {
    return false;
  }
  return true;
}

module.exports = checkSession;