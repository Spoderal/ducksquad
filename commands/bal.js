const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const User = require("../schemas/profile-schema")
const {numberWithCommas} = require("../common/utils")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("bal")
    .setDescription("Check your balance of bread!"),

    async execute(interaction) {

        let breademote = "<:emote_bread:1026971243821408306>"
        //Find the users data by ID
        let userdata = await User.findOne({id: interaction.user.id}) 
        
   
        //Get the users bread from their data above
        let bread = userdata.bread

        let embed = new MessageEmbed()
        .setTitle(`${interaction.user.username}'s Bread Balance`)
        .setDescription(`${breademote} Bread: ${numberWithCommas(bread)}`)
        .setColor("#ebbe7f")

        //Send the bread amount to the channel
        interaction.reply({embeds: [embed]})

    }
}