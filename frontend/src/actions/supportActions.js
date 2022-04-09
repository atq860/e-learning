import axios from "axios";
import {
  PROBLEM_CREATE_RESET,
  PROBLEM_CREATE_FAIL,
  PROBLEM_CREATE_REQUEST,
  PROBLEM_CREATE_SUCCESS,
  PROBLEM_LIST_REQUEST,
  PROBLEM_LIST_SUCCESS,
  PROBLEM_LIST_FAIL,
  PROBLEM_LIST_RESET,
} from "../constants/supportConstants";

export const createProblem = (problem) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROBLEM_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/support`, problem, config);

    dispatch({
      type: PROBLEM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROBLEM_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProblems = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROBLEM_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/support`, config);

    dispatch({
      type: PROBLEM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROBLEM_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
