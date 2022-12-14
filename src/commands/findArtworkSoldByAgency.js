const { SlashCommandBuilder } = require('discord.js');
const ArtworkAgencyRepository = require('../databases/repositories/ArtworkRepository');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('find-artwork-sold-by-agency')
    .setDescription('find all arwork sold by one agency')
    .addStringOption((option) => option.setName('agency-name')
      .setDescription('Agencie name to query')
      .setRequired(true)),
  async execute(interaction) {
    const agencyName = interaction.options.getString('agency-name');
    const artworks = await ArtworkAgencyRepository.get({
      where: {
        agency_name: agencyName,
      },
      join: {
        Agency: 'ArtworkAgency.agency = Agency.agency_id',
        Artwork: 'ArtworkAgency.artwork = Artwork.artwork_id',
      },
    });

    interaction.reply(JSON.stringify(artworks.map((a) => a.artwork_name)));
  },
};
