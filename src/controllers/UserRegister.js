const UserModel = require("../models/User.js");
const jwt = require("jsonwebtoken");
const Cookies = require("cookies");
module.exports = class UserRegister {
  print(request, response) {
    response.render("user/form_register");
  }
  process(request, response) {
    // console.log(request.body)
    let User = new UserModel();

    User.emailExists(request.body.email).then((result) => {
      if (result === false) {
        let bcrypt = require("bcryptjs");
        let salt = bcrypt.genSalt(10);
        let hash = bcrypt.hashSync(request.body.password, salt);
        User.add(
          request.body.lastname,
          request.body.firstname,
          request.body.email,
          hash
        ).then(() => {
          let accessToken = jwt.sign(
            {
              lastname: result.lastname,
              firstname: result.firstname,
              isAdmin: result.isAdmin,
            },
            process.env.SECRET_JWT,
            { expiresIn: 604800 }
          );
          new Cookies(request, response).set("access_token", accessToken, {
            httpOnly: true,
            secure: false,
          });
          response.redirect("/");
        });
        // response.redirect("/");
        request.flash("notify", "Votre compte a bien été créé.");
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
