const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("egg")
    .setDescription("View an egg!")
    .addSubcommand((subcommand) => subcommand
    .setName("view")
    .setDescription("View an egg")
    .addStringOption((option) => option
    .setName("egg")
    .setDescription("The egg to view")
    )
    )
    .addSubcommand((subcommand) => subcommand
    .setName("hatch")
    .setDescription("Hatch an egg")
    .addStringOption((option) => option
    .setName("egg")
    .setDescription("The egg to view")
    )
    .addNumberOption((option) => option
    .setName("bread")
    .setDescription("The bread amount to give the egg")
    )
    ),

    async execute(interaction) {
    
        


    }
}