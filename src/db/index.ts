import mongoose from "mongoose";
import dotenv from 'dotenv';
// TODO: move to server?
dotenv.config();

const uri = process.env.DB_CONNECTION_URL;  

const connect = async () => {
  await mongoose.connect(uri);
};

const disconnect = async () => {
  await mongoose.disconnect();
}

export default { connect, disconnect };
