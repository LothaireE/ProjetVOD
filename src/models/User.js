const UserMongo = require("./UserMongoDB.js");

module.exports = class User {
  async emailExists(email) {
    return (await UserMongo.findOne({ email })) ? true : false;
  }

  async connect(email, password) {
    let user = await UserMongo.findOne({ email });
    if (user !== null) {
      let bcrypt = require("bcryptjs");
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
    }
    return false;
  }

  add(lastname, firstname, email, password) {
    return UserMongo.create({
      lastname,
      firstname,
      email,
      password: hash,
    });
  }
};
