const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),

    async execute(interaction) {

      let embed = new MessageEmbed()
      .setTitle("Ping")
      

      interaction.reply({embeds: [embed]})

    }
}