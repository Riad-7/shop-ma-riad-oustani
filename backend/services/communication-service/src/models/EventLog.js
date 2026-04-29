import mongoose from 'mongoose';

const eventLogSchema = new mongoose.Schema(
  {
    routingKey: { type: String, required: true },
    payload: { type: mongoose.Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);

export const EventLog = mongoose.model('EventLog', eventLogSchema);
