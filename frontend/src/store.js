import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  expertApproveReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  questionCreateReducer,
  questionListReducer,
  questionDetailsReducer,
  questionAnswerCreateReducer,
  answerUpdateReducer,
  questionUpdateReducer,
  questionDeleteReducer,
  answerDeleteReducer,
  questionCloseReducer,
} from "./reducers/questionReducers";
import { problemCreateReducer, problemListReducer } from "./reducers/supportReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  questionCreate: questionCreateReducer,
  questionUpdate: questionUpdateReducer,
  questionDelete: questionDeleteReducer,
  questionList: questionListReducer,
  questionDetails: questionDetailsReducer,
  questionClose: questionCloseReducer,
  questionAnswerCreate: questionAnswerCreateReducer,
  answerUpdate: answerUpdateReducer,
  answerDelete: answerDeleteReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userUpdate: userUpdateReducer,
  userUpdateProfile: userUpdateProfileReducer,
  expertApprove: expertApproveReducer,
  problemCreate: problemCreateReducer,
  problemList: problemListReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
