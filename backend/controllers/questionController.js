import Question from "../models/questionModel.js";
import asyncHandler from "express-async-handler";

// @desc    Create New Question
// @route   POST /api/questions
// access   Private
const createQuestion = asyncHandler(async (req, res) => {
  const { category, question, image } = req.body;

  const newQuestion = new Question({
    user: req.user._id,
    category,
    question,
    image,
  });

  const createdQuestion = await newQuestion.save();
  res.status(201).json(createdQuestion);
});

// @desc    Create new Answer of a Question
// @route   POST /api/questions/:id/answers
// @access  Private/Expert
const createAnswer = asyncHandler(async (req, res) => {
  const { answer, answerImage } = req.body;

  const solution = await Question.findById(req.params.id);

  if (solution) {
    const alreadyAnswered = solution.answers.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyAnswered) {
      res.status(400);
      throw new Error("You have already answered, You can edit your answer");
    }

    const newAnswer = {
      name: req.user.name,
      answer,
      answerImage,
      user: req.user._id,
    };

    solution.answers.push(newAnswer);

    solution.numAnswers = solution.answers.length;

    await solution.save();
    res.status(201).json({ message: "Solution Posted" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc    Update Answer of a Question
// @route   PUT /api/questions/:id/answers/:answerId
// @access  Private/Expert
const updateAnswer = asyncHandler(async (req, res) => {
  const { answer, answerImage } = req.body;

  const solution = await Question.findById(req.params.id);

  if (solution) {
    let already, location;
    solution.answers.find((r, index) => {
      if (r._id.toString() === req.params.answerId.toString()) {
        already = r;
        location = index;
      }
    });

    if (!already) {
      res.status(400);
      throw new Error("Answer not found");
    }

    if (already && already.user.toString() !== req.user._id.toString()) {
      res.status(400);
      throw new Error("You didn't posted this solution");
    }

    solution.answers[location].answer = answer;
    solution.answers[location].answerImage = answerImage;

    await solution.save();
    res.status(201).json({ message: "Solution Updated" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

// @desc    Delete Answer of a Question
// @route   DELETE /api/questions/:id/answers/:answerId
// @access  Private/Expert
const deleteAnswer = asyncHandler(async (req, res) => {
  const solution = await Question.findById(req.params.id);

  if (solution) {
    let already, location;
    solution.answers.find((r, index) => {
      if (r._id.toString() === req.params.answerId.toString()) {
        already = r;
        location = index;
      }
    });

    if (!already) {
      res.status(400);
      throw new Error("Answer not found");
    }

    if (already && already.user.toString() !== req.user._id.toString()) {
      res.status(400);
      throw new Error("You didn't posted this solution");
    }

    solution.answers[location].remove();
    await solution.save();
    res.status(201).json({ message: "Solution Removed" });
  } else {
    res.status(404);
    throw new Error("Question not found");
  }
});

export { createQuestion, createAnswer, updateAnswer, deleteAnswer };
