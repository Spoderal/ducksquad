const lodash = require("lodash");
const User = require("../schemas/profile-schema")
const ms = require("ms");


module.exports = (client) => {
  client.on("messageCreate", async (message) => {

    let userdata = await User.findOne({id: message.author.id})

    if(userdata){
      
      let timeout = userdata.timeout
  
      if(!timeout || timeout == 0){
          userdata.timeout = Date.now()
          
          userdata.save()
          timeout = userdata.timeout
      }
  
      let date = new Date(timeout)
  
      let newdate = addMinutes(1, date)
  
      let ms2 = newdate.getTime()
      let tolog = ms((Date.now() - ms2))
      console.log(tolog)
      console.log((Date.now() - ms2))
  
      if((Date.now() - ms2) > 0) {
        userdata.bread += 1
        userdata.timeout = Date.now()
          
        userdata.save()
      }
    }

  })

}

function addMinutes(numOfMinutes, date = new Date()) {
    date.setMinutes(date.getMinutes() + numOfMinutes);
  
    return date;
  }