const UserModel = require("../models/User.js");
module.exports = class UserRegister {
  print(request, response) {
    response.render("user/form_register");
  }
  process(request, response) {
    // console.log(request.body)
    let User = new UserModel();

    User.emailExists(request.body.email).then((result) => {
      if (result === false) {
        User.add(
          request.body.lastname,
          request.body.firstname,
          request.body.email,
          request.body.password
        ).then(() => {
          request.flash("notify", "Votre compte a bien été créé.");
          response.redirect("/");
        });
      } else {
        // @todo reaffichage du formulaire avec message d'erreur et donnée dans formulaire
        response.render("user/form_register", {
          error: `Cette adresse email est déjà utilisée !`,
          lastname: request.body.lastname,
          firstname: request.body.firstname,
          email: request.body.email,
        });
      }
    });
  }
};
