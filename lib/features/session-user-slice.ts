import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

import { UserInterface } from "~/types/users";

interface SessionUserState {
  fsUserData: Pick<User, "email" | "emailVerified" | "uid"> | null | undefined;
  dbUserData: UserInterface | null | undefined;
}

const initialState: SessionUserState = {
  fsUserData: undefined,
  dbUserData: undefined,
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
