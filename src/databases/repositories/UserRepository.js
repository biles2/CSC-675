const { DatabaseOperations } = require('../DatabaseOperations');

class UserRepository extends DatabaseOperations {
  constructor() {
    super('User');
  }
}

module.exports = new UserRepository();
