const { SlashCommandBuilder } = require('discord.js');
const ArtistCategoryRepository = require('../databases/repositories/ArtistCategoryRepository');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('find-artist-by-category')
    .setDescription('find all artist by category')
    .addStringOption((option) => option.setName('category-name')
      .setDescription('Category name to query')
      .setRequired(true)),
  async execute(interaction) {
    const cat = interaction.options.getString('category-name');
    const artworks = await ArtistCategoryRepository.get({
      join: {
        Category: 'ArtistCategory.category = Category.artwork_category_id',
        Artist: 'ArtistCategory.artist = Artist.artist_id',
      },
      where: {
        artwork_category_name: cat,
      },
    });

    interaction.reply(JSON.stringify(artworks.map((a) => ({
      category: a.artwork_category_name, name: a.artist_name,
    }))));
  },
};
