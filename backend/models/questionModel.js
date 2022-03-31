import mongoose from "mongoose";

const answerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    answer: { type: String, required: true },
    answerImage: { type: String },

    // Associating Expert with the answer
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },

  {
    timestamps: true,
  }
);

const questionSchema = mongoose.Schema(
  {
    // User/Student who is posting question
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    category: {
      type: String,
      required: true,
    },

    question: {
      type: String,
      required: true,
    },

    answers: [answerSchema],

    numAnswers: {
      type: Number,
      required: true,
      default: 0,
    },

    image: {
      type: String,
    },
  },

  {
    timestamps: true, // create fields like creatAt, updateAt etc like that
  }
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
