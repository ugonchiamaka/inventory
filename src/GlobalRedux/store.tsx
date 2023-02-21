import { configureStore } from "@reduxjs/toolkit";
import myReducer from "./ReduxState";
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { TypedUseSelectorHook, useSelector } from "react-redux/es/exports";

const persistConfig = {
  key: "mydata",
  version: 1,
  storage,
};

const persistorReducer = persistReducer(persistConfig, myReducer);

export const store = configureStore({
  reducer: persistorReducer,
});
