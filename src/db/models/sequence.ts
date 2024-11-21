import { Schema, model } from "mongoose";

export type Sequence = {
  name: string;
  seq_value: number;
};

const sequenceSchema = new Schema<Sequence>({
  name: { type: String, required: true, unique: true },
  seq_value: { type: Number, required: true },
});

const SequenceModel = model("sequence", sequenceSchema);

const next = async (name: string) => {
  return (
    await SequenceModel.findOneAndUpdate(
      {
        name,
      },
      {
        $inc: { seq_value: 1 }
      },
      {
        new: true,
        upsert: true,
      }
    ).lean()
  ).seq_value;
};

export default { next };
