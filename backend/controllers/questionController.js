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

// @desc    GET all questions
// @route   GET /api/questions
// access   Public
const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({}).populate("user", "name email");
  res.json(questions);
});

// @desc    Fetch Single Question
// @route   GET /api/questions/:id
// access   Public
const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id).populate(
    "user",
    "name email type createdAt"
  );

  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error("Question Not Found");
  }
});

// @desc    Update a Question
// @route   PUT /api/questions/:id
// access   Private/User|Student
const updateQuestion = asyncHandler(async (req, res) => {
  const { question, image } = req.body;

  const questionFind = await Question.findById(req.params.id);

  if (questionFind) {
    questionFind.question = question;
    questionFind.image = image;

    const updatedQuestion = await questionFind.save();
    res.json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error("Question Not Found");
  }
});

// @desc    Delete a Question
// @route   DELETE /api/questions/:id
// access   Private/Admin
const deleteQuestion = asyncHandler(async (req, res) => {
  const questionFind = await Question.findById(req.params.id);

  if (questionFind) {
    await questionFind.remove();
    res.json({ message: "Question Removed" });
  } else {
    res.status(404);
    throw new Error("Question Not Found");
  }
});

// @desc    Close Question Discussion
// @route   PUT /api/questions/:id/close
// access   Private/USER|STUDENT
const closeQuestionDiscussion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (question) {
    question.isClosed = true;

    const closedQuestion = await question.save();
    res.json(closedQuestion);
  } else {
    res.status(404);
    throw new Error("Question Not Found");
  }
});

// @desc    Create new Answer of a Question
// @route   POST /api/questions/:id/answers
// @access  Private/Expert
const createAnswer = asyncHandler(async (req, res) => {
  const { answer, answerImage } = req.body;

  console.log("sdfs ", req.user.type);

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
      userType: req.user.type,
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

export {
  createQuestion,
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  closeQuestionDiscussion
};
