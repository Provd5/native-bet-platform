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
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<SessionUserState>) => {
      state = action.payload;
      return state;
    },
    setDbUserData: (
      state,
      action: PayloadAction<SessionUserState["dbUserData"]>,
    ) => {
      state.dbUserData = action.payload;
      return state;
    },
    setFsUserData: (
      state,
      action: PayloadAction<SessionUserState["fsUserData"]>,
    ) => {
      state.fsUserData = action.payload;
      return state;
    },
  },
});

export const { setUserData, setDbUserData, setFsUserData } =
  sessionUserSlice.actions;

export default sessionUserSlice.reducer;
