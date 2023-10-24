import { createSlice } from "@reduxjs/toolkit";
import { Token } from "../../types/token";

export interface ITokensState {
  token: Token | null;
}

const initialState = {
  token: null,
};

export const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      return {
        token: action.payload,
      };
    },
    clearToken: (state) => {
      return {
        token: null,
      };
    },
  },
});

export const { updateToken, clearToken } = tokensSlice.actions;

export default tokensSlice.reducer;
