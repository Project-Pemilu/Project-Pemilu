const { User } = require('../models')

module.exports = class UserController {
  static async login(req, res, next) {
    const { username } = req.body;
    try {
      if(!username){
        throw({name:'BadRequest', message: 'Username is required'})
      }

      const [newUser, created] = await User.findOrCreate({
        where: { username: username },
        defaults: {
          username: username,
        },
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};
