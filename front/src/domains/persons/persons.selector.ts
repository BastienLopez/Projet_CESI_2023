import { State } from "../../store/store";
import { DecodedToken } from "../../types/decodedToken";

const selectPersons = (state: State) => state.person;

export const selectPerson = (state: State): DecodedToken | null => {
  return selectPersons(state).person;
};
