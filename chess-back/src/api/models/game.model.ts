import mongoose from 'mongoose';
const { Schema } = mongoose;

const messageSchema = new Schema({
  from: { type: String },
  content: { type: String }
}, { timestamps: true });

const gameSchema = new Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guest: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hasToPlay: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  moves: [{ type: String }],
  messages: [ messageSchema ]
}, { timestamps: true });

const Game = mongoose.model('Game', gameSchema);
export default Game;
