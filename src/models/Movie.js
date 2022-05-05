const MovieMongo = require("./MovieMongoDB.js");

module.exports = class Movie {
  async movieExists(id_tmdb) {
    return (await MovieMongo.findOne({ id_tmdb })) ? true : false;
  }
  add(id_tmdb, title, year, genre, actors, synopsis, affiche) {
    return MovieMongo.create({
      id_tmdb,
      title,
      year,
      genre,
      actors,
      synopsis,
      affiche,
    });
  }
  getAll() {
    return MovieMongo.find();
  }
};
