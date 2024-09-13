import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { GameInterface } from "~/types/games";

import { DataStatus } from "../constants";

interface GamesState {
  status: DataStatus;
  openGames: GameInterface[];
  closedGames: GameInterface[];
}

const initialState: GamesState = {
  status: "pending",
  openGames: [],
  closedGames: [],
};

const gamesSlice = createSlice({
  name: "games",
  initialState: initialState,
  reducers: {
    setGames: (state, action: PayloadAction<GamesState>) => {
      state.status = action.payload.status;
      state.openGames = action.payload.openGames;
      state.closedGames = action.payload.closedGames;
      return state;
    },
  },
});

export const { setGames } = gamesSlice.actions;

export default gamesSlice.reducer;
