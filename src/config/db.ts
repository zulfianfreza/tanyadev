import mongoose from "mongoose";
import { config } from ".";

mongoose.Promise = Promise;
mongoose.connect(config.databaseURL);
mongoose.set("debug", true);
const connectDB = mongoose.connection;

export default connectDB;
