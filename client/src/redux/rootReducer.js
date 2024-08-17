import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import boardReducer from "./slices/boardSlice";
import listReducer from "./slices/listSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  board: boardReducer,
  list: listReducer,
});

export default rootReducer;
