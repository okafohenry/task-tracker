import {
    combineReducers,
  } from "@reduxjs/toolkit";
  import taskReducer from "./taskReducer";
  import userReducer from "./userReducer";
  
  const rootReducer = combineReducers({
    tasks: taskReducer,
    user: userReducer
  });
  
  export default rootReducer;
  export type RootState = ReturnType<any>;