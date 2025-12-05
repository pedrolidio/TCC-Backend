const UserService = require("../services/UserService");

class UserController {
  async index(req, res, next) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const { username, password } = req.body;
      const newUser = await UserService.createUser({ username, password });
      res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        user: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
