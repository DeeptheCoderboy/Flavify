import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  email: String,
  temperature: Number,
  wbc: Number,
  platelets: Number,
  risk: Number,
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Test", testSchema);
