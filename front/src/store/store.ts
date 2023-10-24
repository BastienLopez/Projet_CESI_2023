import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import personsSlice, { IPersonsState } from "../domains/persons/persons.slice";
import tokensSlice, { ITokensState } from "../domains/tokens/tokens.slice";

export interface State {
  person: IPersonsState;
  token: ITokensState;
}

const combinedReducers = combineReducers({
  person: personsSlice,
  token: tokensSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { persistor, store };
