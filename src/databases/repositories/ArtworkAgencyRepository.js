const { DatabaseOperations } = require('../DatabaseOperations');

class ArtworkAgencyRepository extends DatabaseOperations {
  constructor() {
    super('ArtworkAgency');
  }
}

module.exports = new ArtworkAgencyRepository();
