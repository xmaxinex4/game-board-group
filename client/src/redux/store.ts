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

import expireIn from "redux-persist-transform-expire-in";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import activeUserReducer from "./active-user-slice";
import activeUserGroupMembershipsStateReducer from "./active-user-group-memberships-slice";
import activeUserGroupLibraryStateReducer from "./active-user-group-library-slice";
import activeUserCollectionsStateReducer from "./active-user-collections-slice";
import activeUserPlayPreferencesStateReducer from "./active-user-play-preferences-slice";

const expireInTime = 12 * 60 * 60 * 1000; // persisted data will expire in 12h
const expirationKey = "expirationKey";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["activeUser", "activeUserPlayPreferencesState"], // only activeUser and active user's play preferences will be persisted,
  transforms: [expireIn(expireInTime, expirationKey)],
};

const rootReducer = combineReducers({
  activeUser: activeUserReducer,
  activeUserGroupMembershipsState: activeUserGroupMembershipsStateReducer,
  activeUserGroupLibraryState: activeUserGroupLibraryStateReducer,
  activeUserCollectionsState: activeUserCollectionsStateReducer,
  activeUserPlayPreferencesState: activeUserPlayPreferencesStateReducer,
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
