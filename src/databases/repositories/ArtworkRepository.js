const { DatabaseOperations } = require('../DatabaseOperations');

class ArtworkRepository extends DatabaseOperations {
  constructor() {
    super('Artwork');
  }
}

module.exports = new ArtworkRepository();
