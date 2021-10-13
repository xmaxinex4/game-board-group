import { configureStore } from "@reduxjs/toolkit";

import activeUserReducer from "../modules/user/redux/slice";
import groupStateReducer from "../modules/group/redux/slice";

export default configureStore({
  reducer: {
    activeUser: activeUserReducer,
    groupState: groupStateReducer,
  },
});
