const { SlashCommandBuilder } = require('discord.js');
const ArtworkTypeOfRepository = require('../databases/repositories/ArtworkTypeOfRepository');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('find-artwork-group-by-type')
    .setDescription('find all arwork group by type'),
  async execute(interaction) {
    const artworks = await ArtworkTypeOfRepository.get({
      join: {
        ArtworkType: 'ArtworkTypeOf.type = ArtworkType.artwork_type_id',
        Artwork: 'ArtworkTypeOf.artwork = Artwork.artwork_id',
      },
    });

    interaction.reply(JSON.stringify(artworks.map((a) => ({
      name: a.artwork_name, type: a.artwork_type_name,
    }))));
  },
};
