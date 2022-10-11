const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const User = require("../schemas/profile-schema")
const { ButtonStyle } = require('discord-api-types/v10')

module.exports = {
    data: new SlashCommandBuilder()
    .setName("loaf")
    .setDescription("Convert Bread into Loafs!"),

    async execute(interaction) {

        let breademote = "<:emote_bread:1026971243821408306>"
        //Find the users data by ID
        let userdata = await User.findOne({id: interaction.user.id}) 

            if(userdata){
        
                let loafs = userdata.loafs

                if (!loafs || loafs === undefined){
                    let loafs = [{id: `moldyLoaf`, amount: 0}, {id: `regularLoaf`, amount: 0},{id: `rainbowLoaf`, amount: 0}]
                    userdata.loafs = loafs
                    userdata.update()
                }
            
            
    
            
            //Get the users loafs array from their data above
            let moldyLoafs = loafs.filter(loafType => loafType.id == 'moldyLoaf')[0]['amount']
            let regularLoafs = loafs.filter(loafType => loafType.id == 'regularLoaf')[0]['amount']
            let rainbowLoafs = loafs.filter(loafType => loafType.id == 'rainbowLoaf')[0]['amount']
            let row =  new MessageActionRow().setComponents(
                new MessageButton()
                .setCustomId('loaf')
                .setLabel('Make a Loaf')
                .setStyle(ButtonStyle.Primary),)


            let embed = new MessageEmbed()
            .setTitle(`${interaction.user.username} is in the Kitchen!`)
            .setDescription(`It costs 10 ${breademote}Bread to make a random Loaf`)
            .setColor("#ebbe7f")
            .addField(`Bread`, `${userdata.bread} Bread`)
            .addField(`Loafs`, `${moldyLoafs} Moldy Loafs\n${regularLoafs} Regular Loafs\n${rainbowLoafs} Rainbow Loafs`)


            if (userdata.bread < 10){
                row.components[0].setDisabled(true)
            }

            //Send the bread amount to the channel
            let msg = await interaction.reply({embeds: [embed], components:[row], fetchReply: true})

            let filter = (btnInt) => {
                return interaction.user.id === btnInt.user.id;
            };
    
            let collector = msg.createMessageComponentCollector({
                filter: filter,
            });


            collector.on("collect", async (i) => {
                if (i.customId.includes('loaf')) {
                    let newLoaf = random(0,100)
                    console.log(newLoaf)
                    if (newLoaf > 95){
                            userdata.loafs[2]['amount'] += 1
                            rainbowLoafs = loafs.filter(loafType => loafType.id == 'rainbowLoaf')[0]['amount']
                        }
                    else if (20 > newLoaf){
                            userdata.loafs[0]['amount'] += 1
                            moldyLoafs = loafs.filter(loafType => loafType.id == 'moldyLoaf')[0]['amount']
                        }
                    
                    else {
                            userdata.loafs[1]['amount'] += 1
                            regularLoafs = loafs.filter(loafType => loafType.id == 'regularLoaf')[0]['amount']
                        }
                    
                    userdata.bread -= 10
                    await i.update(`Loaf made! Nice!`)

                    if (userdata.bread < 10) {
                        row.components[0].setDisabled(true)
                    }
                }


                let embed = new MessageEmbed()
                .setTitle(`${interaction.user.username} is in the Kitchen!`)
                // .setDescription(`${breademote} Bread: ${numberWithCommas(bread)}`)
                .setDescription(`It costs 10 ${breademote}Bread to make a random Loaf`)
                .setColor("#ebbe7f")
                .addField(`Bread`, `${userdata.bread} Bread`)
                .addField(`Loafs`, `${moldyLoafs} Moldy Loafs\n${regularLoafs} Regular Loafs\n${rainbowLoafs} Rainbow Loafs`)


                await msg.edit({embeds: [embed], components:[row],fetchReply: true})

                userdata.markModified('loafs')
                userdata.save()

            })

    }

    
}}
function random(min, max) {
    return Math.random() * (max - min) + min;
  }