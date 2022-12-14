const { DatabaseOperations } = require('../DatabaseOperations');

class ArtworkCategoryRepository extends DatabaseOperations {
  constructor() {
    super('ArtworkCategory');
  }
}

module.exports = new ArtworkCategoryRepository();
