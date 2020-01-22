import { createStore, combineReducers } from "redux";
import { postReducer } from "./reducers/postReducer";

const rootReducer = combineReducers({
  posts: postReducer
});

export default createStore(rootReducer);
