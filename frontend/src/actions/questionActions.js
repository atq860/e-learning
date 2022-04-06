import axios from "axios";
import {
  ANSWER_UPDATE_FAIL,
  ANSWER_UPDATE_REQUEST,
  ANSWER_UPDATE_SUCCESS,
  QUESTION_CREATE_ANSWER_FAIL,
  QUESTION_CREATE_ANSWER_REQUEST,
  QUESTION_CREATE_ANSWER_SUCCESS,
  QUESTION_CREATE_FAIL,
  QUESTION_CREATE_REQUEST,
  QUESTION_CREATE_SUCCESS,
  QUESTION_DETAILS_FAIL,
  QUESTION_DETAILS_REQUEST,
  QUESTION_DETAILS_SUCCESS,
  QUESTION_LIST_FAIL,
  QUESTION_LIST_REQUEST,
  QUESTION_LIST_SUCCESS,
} from "../constants/questionConstants";

// Create a New Question from User
export const createQuestion = (question) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/questions`, question, config);

    dispatch({
      type: QUESTION_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// List and Show all the Questions
export const listQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/questions`);

    dispatch({
      type: QUESTION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: QUESTION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listQuestionDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: QUESTION_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/questions/${id}`);

    dispatch({ type: QUESTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: QUESTION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createQuestionAnswer =
  (questionId, answer) => async (dispatch, getState) => {
    try {
      dispatch({
        type: QUESTION_CREATE_ANSWER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // passing second Argument an Empty Object, as we are not passing data here
      await axios.post(`/api/questions/${questionId}/answers`, answer, config);

      dispatch({
        type: QUESTION_CREATE_ANSWER_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: QUESTION_CREATE_ANSWER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateAnswer = (questionId, answerId, answer) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANSWER_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // passing second Argument an Empty Object, as we are not passing data here
    const { data } = await axios.put(
      `/api/questions/${questionId}/answers/${answerId}`,
      answer,
      config
    );

    dispatch({
      type: ANSWER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANSWER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
