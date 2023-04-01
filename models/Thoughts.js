const {Schema, Types, model} = require('mongoose')

// const reactionSchema = new Schema(
//     {
//         reactionId:{type: Schema.Types.ObjectId, default:  () => new Types.ObjectId()},
//         reactionBody:{type: String, required: true, maxlength: 280},
//         username:{type: String, required: true},
//         createdAt: { type: Date, default: Date.now() },
//     }
// )


const thoughtSchema = new Schema(
    {
        thoughtText: {type: String, required: true, min_length: 1, max_length: 280},
        createdAt: { type: Date, default: Date.now() },
        username: [{
            type: Schema.Types.String,
            ref: 'User',
        }],
        userId: [{
            type: Schema.Types.ObjectId,
            ref: 'User', 
        }],
        reactions: [{
            type: Schema.Types.ObjectId,
            ref: 'Reactions',
            },
        ],
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
    }
);

//create a virtual that gathers the couunt of reactions
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
    })


const Thoughts = model('Thoughts', thoughtSchema);


module.exports = Thoughts;

