const UserModel = require("../models/User.js");

module.exports = class Authentification {
  print(request, response) {
    response.render("user/form_auth");
  }

  process(request, response) {
    let User = new UserModel();
    User.connect(request.body.email, request.body.password).then((result) => {
      // l'identification a échouée
      if (result == false) {
        response.render("user/form_auth", {
          error: `L'identification a échouée`,
          email: request.body.email,
        });
      } else {
        // @todo on enregistre les infos en session
        request.session.user = {
          connected: true,
          id: result._id,
          email: result.email,
          isAdmin: result.isAdmin,
          lastname: result.lastname,
          firstname: result.firstname,
        };
        // message dans flashbag
        request.flash("notify", "Vous êtes maintenant connecté.");
        // redirection vers l'accueil
        response.redirect("/");
      }
    });
  }
  deconnect(request, response) {
    delete request.session.user;
    // message dans flashbag
    request.flash("notify", "Vous êtes maintenant déconnecté.");
    // redirection vers l'accueil
    response.redirect("/");
  }
};
