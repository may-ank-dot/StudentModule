import mongoose from "mongoose";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/School`)
        console.log(`mongoDB connected !! : DB_HOST: ${connectionInstance.connection.host}`);
    } catch(err) {
        console.log("mongoDB connection error: ",err);
        process.exit(1);
    }
}

export default connectDB;