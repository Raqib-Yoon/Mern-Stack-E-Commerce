import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.connect(process.env.DATABASE);
    console.log("db connected successfull...");
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;
