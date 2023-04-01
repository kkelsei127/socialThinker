const {Schema, Types, model} = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId:{type: Schema.Types.ObjectId, default:  () => new Types.ObjectId()},
        reactionBody:{type: String, required: true, maxlength: 280},
        username: [{
            type: Schema.Types.String,
            ref: 'User',
        }],
        userId: [{
            type: Schema.Types.ObjectId,
            ref: 'User', 
        }],
        createdAt: { type: Date, default: Date.now() },
    }
);


const Reactions = model('Reactions', reactionSchema);



module.exports = Reactions;

