import { combineReducers } from "@reduxjs/toolkit";

import boardReducer from "./slices/boardSlice";
import listReducer from "./slices/listSlice";

const rootReducer = combineReducers({
  board: boardReducer,
  list: listReducer,
});

export default rootReducer;
