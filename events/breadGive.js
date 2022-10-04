const lodash = require("lodash");
const User = require("../schemas/profile-schema")


module.exports = (client) => {
  client.on("messageCreate", async (message) => {

    let userdata = await User.findOne({id: message.author.id})

    let timeout = userdata.timeout

    if(!timeout || timeout == 0){
        userdata.timeout = Date.now()
        userdata.save()
        timeout = userdata.timeout
    }

    console.log(addMinutes(1, timeout))


    setTimeout(() => {
        
    }, 1000);

  })

}

function addMinutes(numOfMinutes, date = new Date()) {
    date.setMinutes(date.getMinutes() + numOfMinutes);
  
    return date;
  }