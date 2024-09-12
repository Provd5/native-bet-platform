import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

import { UserInterface } from "~/types/users";

interface SessionUserState {
  fsUserData: Pick<User, "email" | "emailVerified" | "uid"> | null;
  dbUserData: UserInterface | null;
}

const initialState: SessionUserState = {
  fsUserData: null,
  dbUserData: null,
};

const sessionUserSlice = createSlice({
  name: "sessionUser",
  initialState: initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<SessionUserState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setUserData } = sessionUserSlice.actions;

export default sessionUserSlice.reducer;
