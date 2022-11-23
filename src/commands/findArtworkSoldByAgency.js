const { SlashCommandBuilder } = require('discord.js');
const AgencyRepository = require('../databases/repositories/AgencyRepository');
const ArtworkRepository = require('../databases/repositories/ArtworkRepository');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('find-artwork-sold-by-agency')
    .setDescription('find all arwork sold by one agency')
    .addIntegerOption((option) => option.setName('agency-id')
      .setDescription('Agencie id to query')
      .setRequired(true)),
  async execute(interaction) {
    const agencyId = interaction.options.getInteger('agency-id');
    const artworks = ArtworkRepository.get({
      where: {
        agency: agencyId;
      }
    })
    
  },
};
