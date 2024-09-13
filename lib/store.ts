import { configureStore } from "@reduxjs/toolkit";

import gamesReducer from "~/lib/features/games-slice";
import sessionUserReducer from "~/lib/features/session-user-slice";
import teamsReducer from "~/lib/features/teams-slice";

export const store = configureStore({
  reducer: {
    sessionUser: sessionUserReducer,
    games: gamesReducer,
    teams: teamsReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
