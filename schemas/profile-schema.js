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
    },
    timeout:{
        type: Number,
        required:false,
        default:0
    },
    loafs:{
        type: Array,
        required:true,
        default: [{id: `moldyLoaf`, amount: 0}, {id: `regularLoaf`, amount: 0},{id: `rainbowLoaf`, amount: 0}]
    },
    duckeggs:{
        type: Object,
        required:true,
        default: {eggs: [], ducks: []}
    },
})


module.exports = mongoose.model('profile', Profile)