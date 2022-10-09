const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const User = require("../schemas/profile-schema")
const Ducks = require("../schemas/duck-schema")
const {numberWithCommas} = require("../common/utils")
const { ButtonStyle } = require('discord-api-types/v10')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("buy")
    .setDescription("Purchase Eggs!"),

    async execute(interaction) {

        let breademote = "<:emote_bread:1026971243821408306>"
        //Find the users data by ID
        let userdata = await User.findOne({id: interaction.user.id}) 
        
   
        //Get the users bread from their data above
        let bread = userdata.bread

        //Get the users loafs array from their data above
        let loafs = userdata.loafs
        let moldyLoafs = loafs.filter(loafType => loafType.id == 'moldyLoaf')[0]['amount']
        let regularLoafs = loafs.filter(loafType => loafType.id == 'regularLoaf')[0]['amount']
        let rainbowLoafs = loafs.filter(loafType => loafType.id == 'rainbowLoaf')[0]['amount']
        

        let embed = new MessageEmbed()
        .setTitle(`Welcome to the Shop, ${interaction.user.username}!`)
        .setDescription(`${breademote} Bread: ${numberWithCommas(bread)}`)
        .setColor("#ebbe7f")
        .addField(`Loafs`, `${moldyLoafs} Moldy Loafs\n${regularLoafs} Regular Loafs\n${rainbowLoafs} Rainbow Loafs`)

        //Send the bread amount to the channel
        interaction.reply({embeds: [embed], components:[
            new MessageActionRow().setComponents(
                new MessageButton()
                .setCustomId('moldy')
                .setLabel('Cheap Egg')
                .setStyle(ButtonStyle.Primary),

                new MessageButton()
                .setCustomId('regular')
                .setLabel('Fresh Egg')
                .setStyle(ButtonStyle.Primary),

                new MessageButton()
                .setCustomId('rainbow')
                .setLabel('Rainbow Egg')
                .setStyle(ButtonStyle.Primary),
            )
            //.addComponents(
            //     new ButtonBuilder()
            //     .setCustomId('moldy')
            //     .setLabel('Cheap Egg')
            //     .setStyle(ButtonStyle.Primary),
            //     new ButtonBuilder()
            //     .setCustomId('regular')
            //     .setLabel('Fresh Egg')
            //     .setStyle(ButtonStyle.Primary),
            //     new ButtonBuilder()
            //     .setCustomId('rainbow')
            //     .setLabel('Rainbow Egg')
            //     .setStyle(ButtonStyle.Primary),
            // )
        ]
    })

    }
}