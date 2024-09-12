import { configureStore } from "@reduxjs/toolkit";

import gamesReducer from "~/lib/features/games-slice";
import sessionUserReducer from "~/lib/features/session-user-slice";

export const store = configureStore({
  reducer: {
    sessionUser: sessionUserReducer,
    games: gamesReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
