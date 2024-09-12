import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { GameInterface } from "~/types/games";

import { DataStatus } from "../constants";

interface GamesState {
  status: DataStatus;
  openGames: GameInterface[];
  closedGames: GameInterface[];
  show: "closed" | "open";
}

const initialState: GamesState = {
  status: "pending",
  openGames: [],
  closedGames: [],
  show: "open",
};

const gamesSlice = createSlice({
  name: "games",
  initialState: initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Omit<GamesState, "show">>) => {
      state.status = action.payload.status;
      state.openGames = action.payload.openGames;
      state.closedGames = action.payload.closedGames;
      return state;
    },
    setShowGames: (state, action: PayloadAction<GamesState["show"]>) => {
      state.show = action.payload;
    },
  },
});

export const { setGames, setShowGames } = gamesSlice.actions;

export default gamesSlice.reducer;
