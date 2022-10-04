const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),

    async execute(interaction) {
      //ping spoder
      let embed = new MessageEmbed()
      .setTitle("Ping")
      //ping natix
      

      interaction.reply({embeds: [embed]})

    }
}