import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.connect(process.env.DATABASE);
    console.log("db connected successfull...");
    mongoose.set("strictPopulate", false);
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnect;
