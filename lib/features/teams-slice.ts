import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { TeamInterface } from "~/types/teams";

import { DataStatus } from "~/constants/data";

interface TeamsState {
  status: DataStatus;
  teams: TeamInterface[];
}

const initialState: TeamsState = {
  status: "pending",
  teams: [],
};

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setTeams: (state, action: PayloadAction<TeamsState>) => {
      state.status = action.payload.status;
      state.teams = action.payload.teams;
      return state;
    },
  },
});

export const { setTeams } = teamsSlice.actions;

export default teamsSlice.reducer;
