const { SlashCommandBuilder } = require('discord.js');
const UserRepository = require('../databases/repositories/UserRepository');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remove-user')
    .setDescription('remove a specified user')
    .addStringOption((option) => option.setName('user-fullname')
      .setDescription('user name to query')
      .setRequired(true)),
  async execute(interaction) {
    const userName = interaction.options.getString('user-fullname');
    const user = await UserRepository.delete({
      where: {
        user_name: userName,
      },
    });

    if (!user) {
      interaction.reply('Error during comand execution');
    }

    interaction.reply(`user ${userName} deleted`);
  },
};
