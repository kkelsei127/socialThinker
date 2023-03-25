const {Schema, model} = require('mongoose')

const reactionSchema = new Schema(
    {
        //this default function is probably wrong I dunno 
        //default value is supposed to be set to a new ObjectId
        reactionId:{type: objectId, default: 0},
        reactionBody:{type: String, required: true, max: 280},
        username:{type: String, required: true},
        createdAt: { type: Date, default: Date.now },
    }
)


const thoughtSchema = new Schema(
    {
        thoughtText: {type: String, required: true, min: 1, max: 280},
        createdAt: { type: Date, default: Date.now },
        username: {type: String, required: true},
        reactions: [{
            type: Schema.Types.objectId,
            ref: [reactionSchema],
            },
        ],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

//create a new class from the thought model
const Thoughts = mongoose.model('Thoughts', thoughtSchema);


module.exports = Thoughts;

