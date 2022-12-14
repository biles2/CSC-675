const { DatabaseOperations } = require('../DatabaseOperations');

class ArtworkTypeOfRepository extends DatabaseOperations {
  constructor() {
    super('ArtworkTypeOf');
  }
}

module.exports = new ArtworkTypeOfRepository();
