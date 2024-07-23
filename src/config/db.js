const mongoose = require('mongoose');

const mongoURIDev = process.env.MONGO_URI_DEV || 'mongodb://localhost:27017/shop';
const mongoURIProd = process.env.MONGO_URI_PROD || 'mongodb+srv://user:user@cluster0.1c9llif.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  const mongoURI = process.env.NODE_ENV === 'production' ? mongoURIProd : mongoURIDev;

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(`MongoDB connected (${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'})`);
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process on connection failure
  }
};

module.exports = connectDB;
