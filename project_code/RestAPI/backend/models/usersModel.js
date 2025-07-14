const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Please add name!']
    },
    email : {
        type : String,
        required : [true, 'Please add an email!'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Please add an email!'],
        unique : true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Users', usersSchema)