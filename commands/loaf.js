const {SlashCommandBuilder} = require('@discordjs/builders')
const {MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')
const User = require("../schemas/profile-schema")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("loaf")
    .setDescription("Convert Bread into Loafs!"),

    async execute(interaction) {

        let breademote = "<:emote_bread:1026971243821408306>"
        //Find the users data by ID
        let userdata = await User.findOne({id: interaction.user.id}) 

        //Get the users bread from their data above
        let bread = userdata.bread
        let convert = true

        if (bread < 10){
            convert = false
        }

        if (convert){
            //Check if they have the loafs array in their user data
            if(userdata){
        
                let loafs = userdata.loafs

                if (!loafs || loafs === undefined){
                    let loafs = [{id: `moldyLoaf`, amount: 0}, {id: `regularLoaf`, amount: 0},{id: `rainbowLoaf`, amount: 0}]
                    userdata.loafs = loafs
                    userdata.update()
                }
            
                // if(!loafs || loafs == [{id: `moldyLoaf`, amount: 0}, {id: `regularLoaf`, amount: 0},{id: `rainbowLoaf`, amount: 0}]){
                //     loafs = userdata.loafs
                //     userdata.save()
                // }
            }
            let newLoaf = random(0,100)
            console.log(newLoaf)
            if (newLoaf > 95){
                    userdata.loafs[2]['amount'] += 1
                    console.log('rain')
                    userdata.markModified(`loafs`)
                }
            else if (20 > newLoaf){
                    userdata.loafs[0]['amount'] += 1
                    console.log('mold')
                    userdata.markModified(`loafs`)
                }
            
            else {
                    userdata.loafs[1]['amount'] += 1
                    console.log('reg')
                    userdata.markModified(`loafs`)
                }
            
            userdata.bread -= 10
            
    
            
            //Get the users loafs array from their data above
            let loafs = userdata.loafs
            let moldyLoafs = loafs.filter(loafType => loafType.id == 'moldyLoaf')[0]['amount']
            let regularLoafs = loafs.filter(loafType => loafType.id == 'regularLoaf')[0]['amount']
            let rainbowLoafs = loafs.filter(loafType => loafType.id == 'rainbowLoaf')[0]['amount']
            

            // let totalLoafs = moldyLoafs+regularLoafs+rainbowLoafs

            let embed = new MessageEmbed()
            .setTitle(`${interaction.user.username}'s Bread to Loaf Maker`)
            // .setDescription(`${breademote} Bread: ${numberWithCommas(bread)}`)
            .setDescription(`It costs 10 ${breademote}Bread to make a random Loaf`)
            .setColor("#ebbe7f")
            .addField(`Bread`, `${bread} Bread`)
            .addField(`Loafs`, `${moldyLoafs} Moldy Loafs\n${regularLoafs} Regular Loafs\n${rainbowLoafs} Rainbow Loafs`)


            userdata.save()
            //Send the bread amount to the channel
            interaction.reply({embeds: [embed]})
        }
        else{
            interaction.reply(`You need at least 10 Bread!`)
        }
    }

    
}
function random(min, max) {
    return Math.random() * (max - min) + min;
  }