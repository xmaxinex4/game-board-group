/* eslint-disable no-unused-vars, no-param-reassign */

import { createSlice } from "@reduxjs/toolkit";

import { CollectionResponse, CollectionsResponse } from "../../../src/types/types";

export type ActiveUserCollectionsState = {
  activeUserCollections: CollectionsResponse,
};

export type ActiveUserCollectionsStateReducers = {
  setActiveUserCollections: (state: ActiveUserCollectionsState, action: {
    type: string,
    payload: { collections: CollectionResponse[]; },
  }) => void;
  addActiveUserCollection: (state: ActiveUserCollectionsState, action: {
    type: string,
    payload: { collection: CollectionResponse; },
  }) => void;
  updateActiveUserCollection: (state: ActiveUserCollectionsState, action: {
    type: string,
    payload: { collection: CollectionResponse; },
  }) => void;
};

export const activeUserCollectionsSlice = createSlice<ActiveUserCollectionsState, ActiveUserCollectionsStateReducers>({
  name: "activeUserCollections",
  initialState: {
    activeUserCollections: { collections: [] },
  },
  reducers: {
    setActiveUserCollections: (state, action: {
      type: string,
      payload: { collections: CollectionResponse[]; },
    }) => {
      state.activeUserCollections = { collections: action.payload.collections };
    },
    addActiveUserCollection: (state, action: {
      type: string,
      payload: { collection: CollectionResponse; },
    }) => {
      const newUserCollection = state.activeUserCollections.collections;
      state.activeUserCollections = { collections: newUserCollection.concat(action.payload.collection) };
    },
    updateActiveUserCollection: (state, action: {
      type: string,
      payload: { collection: CollectionResponse; },
    }) => {
      const collectionIndex = state.activeUserCollections.collections.findIndex(
        (collection) => collection.id === action.payload.collection.id,
      );

      if (!(collectionIndex < 0)) {
        state.activeUserCollections.collections[collectionIndex] = action.payload.collection;
      }
    },
  },
});

export const {
  setActiveUserCollections,
  addActiveUserCollection,
  updateActiveUserCollection,
} = activeUserCollectionsSlice.actions;

export const selectActiveUserCollections = (state: { activeUserCollectionsState: ActiveUserCollectionsState; }) => (
  state.activeUserCollectionsState.activeUserCollections
);

export default activeUserCollectionsSlice.reducer;
