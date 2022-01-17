import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  screenShot: { type: String, required: true },
});
