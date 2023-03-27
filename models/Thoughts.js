const {Schema} = require('mongoose')

const reactionSchema = new Schema(
    {
        reactionId:{type: objectId, default:  () => new Types.ObjectId()},
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

//create a virtual that gathers the couunt of reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
    })


//create a new class from the thought model
const Thoughts = mongoose.model('Thoughts', thoughtSchema);


module.exports = Thoughts;

