import { Person } from "./Person";

export type PersonDTO = {
  _persons: Person[];
  _nbMaxPages: number;
  _page: number;
};
