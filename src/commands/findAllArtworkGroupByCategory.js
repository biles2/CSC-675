const { SlashCommandBuilder } = require('discord.js');
const ArtworkCategoryRepository = require('../databases/repositories/ArtworkCategoryRepository');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('find-artwork-group-by-category')
    .setDescription('find all arwork group by category'),
  async execute(interaction) {
    const artworks = await ArtworkCategoryRepository.get({
      join: {
        Category: 'ArtworkCategory.category = Category.artwork_category_id',
        Artwork: 'ArtworkCategory.artwork = Artwork.artwork_id',
      },
    });

    interaction.reply(JSON.stringify(artworks.map((a) => ({
      name: a.artwork_name, category: a.artwork_category_name,
    }))));
  },
};
