const { Schema, model, Types } = require('mongoose');


const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },    
      replyBody: {
        type: String,
        required: true,
        maxlength: 280
      },
      username: {
          type: String,
          required: true
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
});



const ThoughtSchema = new Schema({

    thoughtText: {
        type: String,
        required: true,
        minlenght: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.reduce((total, reactions) => total + reactions.length + 1, 0); //is this right?
})

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;