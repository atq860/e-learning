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

export const problemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PROBLEM_CREATE_REQUEST:
      return { loading: true };
    case PROBLEM_CREATE_SUCCESS:
      return { loading: false, success: true, problem: action.payload };
    case PROBLEM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PROBLEM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const problemListReducer = (state = { problems: [] }, action) => {
  switch (action.type) {
    case PROBLEM_LIST_REQUEST:
      return { loading: true };
    case PROBLEM_LIST_SUCCESS:
      return { loading: false, problems: action.payload };
    case PROBLEM_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PROBLEM_LIST_RESET:
      return {
        problems: [],
      };
    default:
      return state;
  }
};
