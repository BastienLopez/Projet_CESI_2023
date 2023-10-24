import { createSlice } from "@reduxjs/toolkit";
import { DecodedToken } from "../../types/decodedToken";

export interface IPersonsState {
  person: DecodedToken | null;
}

const initialState = {
  person: null,
};

export const personsSlice = createSlice({
  name: "persons",
  initialState,
  reducers: {
    updatePerson: (state, action) => {
      return {
        person: action.payload,
      };
    },
    clearPerson: (state) => {
      return {
        person: null,
      };
    },
  },
});

export const { updatePerson, clearPerson } = personsSlice.actions;

export default personsSlice.reducer;
