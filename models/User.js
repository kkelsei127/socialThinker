// Require schema and model from mongoose
const {Schema, Types, model } = require('mongoose')


var validEmail = function(email) {
    var regEx = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return regEx.test(email)
}

// Construct a new instance of the schema class
const userSchema = new Schema({
    // Configure individual properties using Schema Types
    username: { 
        type: String,
        required: true, 
        unique: true, 
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        validator: [validEmail, 'Please enter a valid email'],
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Please enter a valid email']
    },
    // references the thoughts model to gather thoughts
    thought: [{
        type: Schema.Types.ObjectId,
        ref: 'Thoughts',
    }],
    // references the user model, self reference, to get a list of friends
    friends: [{
        type: Schema.Types.ObjectId, 
        ref: 'User',
    }],
     
    },
    //Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

 //Create a virtual getter to access the friends portion of the User Model
userSchema.virtual('friendCount').get(function() {
return this.friends.length;
})


const User = model('user', userSchema);


module.exports = User;
