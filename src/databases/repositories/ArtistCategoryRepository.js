const { DatabaseOperations } = require('../DatabaseOperations');

class ArtistCategoryRepository extends DatabaseOperations {
  constructor() {
    super('ArtistCategory');
  }
}

module.exports = new ArtistCategoryRepository();
