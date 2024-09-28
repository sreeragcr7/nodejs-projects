const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    username:{
        type:String,
        required:[true, 'Please add the Username!']
    },
    email:{
        type:String,
        required:[true, 'Please enter Email!'],
        unique: [true, 'this Email is alredy taken!']
    },
    password:{
        type:String,
        required:[true, 'Please enter the Password!']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)