const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type:String,
        required:[true, 'Please add the Name!']
    },
    email:{
        type:String,
        required:[true, 'Please add Email!']
    },
    phone:{
        type:Number,
        required:[true, 'Please add the Number!']
    }
},{
    timestamps: true
});


module.exports = mongoose.model('Contact', contactSchema);