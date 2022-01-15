import * as mongoose from 'mongoose';

export const VideoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  video: { type: File, required: true },
  screenShot: { type: File, required: true },
});
