import mongoose from "mongoose";

const supportSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    problem: {
      type: String,
      required: true,
    }
  },

  {
    timestamps: true, 
  }
);

const Support = mongoose.model("Support", supportSchema);

export default Support;
