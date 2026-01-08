const { getSQLConnection } = require("../../config/database");

class UserRepository {
  get connection() {
    return getSQLConnection();
  }

  async findAll() {
    return this.connection("Users").select("id", "username", "role_id");
  }

  async findById(id) {
    return this.connection("Users")
      .select("id", "username", "role_id")
      .where({ id })
      .first();
  }

  async findByUsername(username) {
    return this.connection("Users").where({ username }).first();
  }

  async create(userData) {
    const [id] = await this.connection("Users").insert(userData);

    const { password_hash, ...userSafeData } = userData;

    return { id, ...userSafeData };
  }

  async update(id, data) {
    await this.connection("Users").where({ id }).update(data);
    
    return this.findById(id);
  }
}

module.exports = new UserRepository();
