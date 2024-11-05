module.exports = class UserController {
  static async login(req, res, next) {
    const { username } = req.body;

    try {
      const newUser = await findOrCreate({
        username,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
};