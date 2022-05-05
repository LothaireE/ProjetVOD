module.exports = (app) => {
  app.get("/", (req, res) => {
    let Home = require("../src/controllers/Home.js");
    let Controller = new Home();
    Controller.print(req, res);
  });
  app.get("/inscription", (req, res) => {
    let UserRegister = require("../src/controllers/UserRegister.js");
    let Controller = new UserRegister();
    Controller.print(req, res);
  });
  app.post("/inscription", (req, res) => {
    let UserRegister = require("../src/controllers/UserRegister.js");
    let Controller = new UserRegister();
    Controller.process(req, res);
  });
  app.get("/connexion", (req, res) => {
    let Authentification = require("../src/controllers/Authentification.js");
    let Controller = new Authentification();
    Controller.print(req, res);
  });
  app.post("/connexion", (req, res) => {
    let Authentification = require("../src/controllers/Authentification.js");
    let Controller = new Authentification();
    Controller.process(req, res);
  });
  app.get("/deconnexion", (req, res) => {
    let Authentification = require("../src/controllers/Authentification.js");
    let Controller = new Authentification();
    Controller.deconnect(req, res);
  });
  app.get("/admin/movie/add/", (req, res) => {
    let AdminMovie = require("../src/controllers/AdminMovie.js");
    let Controller = new AdminMovie();
    Controller.print(req, res);
  });
  app.post("/admin/movie/add/", (req, res) => {
    let AdminMovie = require("../src/controllers/AdminMovie.js");
    let Controller = new AdminMovie();
    Controller.process(req, res);
  });
  app.get("/admin/movie/list/", (req, res) => {
    let AdminMovie = require("../src/controllers/AdminMovie.js");
    let Controller = new AdminMovie();
    Controller.printList(req, res);
  });
};
