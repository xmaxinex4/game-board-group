import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import activeUserReducer from "./active-user-slice";
import activeUserGroupMembershipsStateReducer from "./active-user-group-memberships-slice";
import activeUserGroupLibraryStateReducer from "./active-user-group-library-slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["activeUser"], // only activeUser will be persisted
};

const rootReducer = combineReducers({
  activeUser: activeUserReducer,
  activeUserGroupMembershipsState: activeUserGroupMembershipsStateReducer,
  activeUserGroupLibraryState: activeUserGroupLibraryStateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
