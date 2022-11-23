const { DatabaseOperations } = require('../DatabaseOperations');

class AgencyRepository extends DatabaseOperations {
  constructor() {
    super('Agency');
  }
}

module.exports = new AgencyRepository();
