import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_CONNECTION_URL!;

let connection;

const connect = async () => {
  connection = await mongoose.connect(uri);
};

const disconnect = async () => {
  await mongoose.disconnect();
};

export default { connect, disconnect };
