import { configureStore } from "@reduxjs/toolkit";
import { default as rootReducer } from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
