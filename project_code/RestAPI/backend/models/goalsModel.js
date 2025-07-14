const mongoose = require('mongoose');

const goalsSchema = mongoose.Schema({
    createdBy:{
        type : mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    title : {
        type : String,
        required : [true, 'Please add a title!']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Goals', goalsSchema)