const mongooose = require('mongoose')

const fileSchema = new mongooose.Schema({
    filename:{
        type: String,
        required: [true,'Please Add FileName']
    },
    code:{
        type: String,
        required: [true, 'Please Add Code Digit']
    },
    userId: {
        type: mongooose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongooose.model("File",fileSchema)