import mongoose from "mongoose";
const uri =
  "mongodb+srv://ugurcansengit:UbQJ2aZmJVadi2iP@cluster0.7moao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connect = async () => {
  await mongoose.connect(uri);
};

const disconnect = async () => {
  await mongoose.disconnect();
}

export default { connect, disconnect };
