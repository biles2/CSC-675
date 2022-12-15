/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { exit } = require('node:process');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

commandFiles.forEach((file) => {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
});

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

const deploy = async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log('Command succesfully added');
    exit(0);
  } catch (err) {
    console.error(err);
  }
};

deploy();
