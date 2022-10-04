const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const User = require("../schemas/profile-schema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("start")
    .setDescription("Start your bot account!"),

    async execute(interaction) {
  
        let userdata = await User.findOne({id: interaction.user.id}) 

        if(userdata) return;
        
        let newuser = await new User({ id: interaction.user.id });
        newuser.save();



        interaction.reply(`Started`)

    }
}