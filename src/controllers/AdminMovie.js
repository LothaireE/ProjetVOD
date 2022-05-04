module.exports = class AdminMovie {
  print(request, response) {
    // vérification des droits d'admin
    if (this.authAdmin(request, response)) {
      response.render("admin/movies");
    }
  }

  authAdmin(request, response) {
    if (
      typeof request.session.user == "undefined" ||
      request.session.user.isAdmin !== true
    ) {
      response.status(401);
      response.end("HTTP 401 Unauthorized");
      return false;
    }
    return true;
  }
};
