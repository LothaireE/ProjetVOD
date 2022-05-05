const MovieModel = require("../models/Movie.js");
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
  process(request, response) {
    // console.log(request.body)
    let Movie = new MovieModel();

    Movie.movieExists(request.body.id_tmdb).then((result) => {
      if (result === false) {
        Movie.add(
          request.body.id_tmdb,
          request.body.title,
          request.body.year,
          request.body.genre,
          request.body.actors,
          request.body.synopsis,
          request.body.affiche
        ).then(() => {
          request.flash("notify", "Film ajouté.");
          response.redirect("/");
        });
      } else {
        // @todo reaffichage du formulaire avec message d'erreur et donnée dans formulaire
        response.render("admin/movies", {
          error: `Ce film est présent en base de donnée... 👹`,
        });
      }
    });
  }
  printList(request, response) {
    if (this.authAdmin(request, response)) {
      let moviesList = new MovieModel();
      moviesList.getAll().then((movies) => {
        console.log("movies", movies);
        response.render("admin/movies_list", { movies });
      });
    }
  }
};
