import mongoose from 'mongoose';

export const connectDatabase = async (mongoUri, serviceName) => {
  await mongoose.connect(mongoUri);
  console.log(`[${serviceName}] MongoDB connected`);
};
