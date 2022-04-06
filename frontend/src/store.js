import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReducers";
import {
  questionCreateReducer,
  questionListReducer,
  questionDetailsReducer,
  questionAnswerCreateReducer,
  answerUpdateReducer
} from "./reducers/questionReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  questionCreate: questionCreateReducer,
  questionList: questionListReducer,
  questionDetails: questionDetailsReducer,
  questionAnswerCreate: questionAnswerCreateReducer,
  answerUpdate: answerUpdateReducer
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
