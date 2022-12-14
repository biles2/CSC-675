const { DatabaseOperations } = require('../DatabaseOperations');

class ArtworkRepository extends DatabaseOperations {
  constructor() {
    super('ArtworkAgency');
  }
}

module.exports = new ArtworkRepository();
