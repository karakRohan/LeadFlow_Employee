// import mongoose from 'mongoose';

// export const connectDB = async () => {
//   if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured');
//   await mongoose.connect(process.env.MONGODB_URI);
//   console.log(`MongoDB connected: ${mongoose.connection.host}`);
// };


import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not configured in the .env file');
    }

    await mongoose.connect(mongoURI);

    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    throw error;
  }
};
