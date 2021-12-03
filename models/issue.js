const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    votes: [{
        userId: {
            type: String,
            required: true
        },
        voteType: {
            type: Number,
            default: 0,
            required: true
        }
    }] | Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
})

module.exports = mongoose.model("Issue", issueSchema)