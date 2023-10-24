import { State } from "../../store/store";
import { Token } from "../../types/token";

const selectTokens = (state: State) => state.token;

export const selectToken = (state: State): Token | null => {
  return selectTokens(state).token;
};
