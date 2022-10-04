const mongoose = require('mongoose')


const Profile = new mongoose.Schema({
    id:{
        type: Number,
        required:true,
        unique: true
    },
    bread:{
        type:Number,
        required: false,
        default: 0
    }
})


module.exports = mongoose.model('profile', Profile)