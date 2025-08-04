import { Contract } from "web3";

export interface StateType {
  providers: Record<string, unknown>;
  accounts: string;
  contracts: any;
  get: any[];
  user: any[];
  id: number;
  title: string;
}

export type ActionType =
  | { type: "SET_ACCOUNT"; account: string }
  | { type: "SET_PROVIDER"; providers: Record<string, unknown> }
  | { type: "SET_CONTRACT"; contract: Record<string, unknown> }
  | { type: "GET_ALL_COMPAIGN"; get: any[] }
  | { type: "SET_DONATE"; donate: number }
  | { type: "SET_TITLE"; title: string }
  | { type: "SET_USER_COMPAIGN"; user: any[] };

export const initialState: StateType = {
  providers: {},
  accounts: "0x048a33def606db075f4cbc2f2ed7d313af8e1267",
  contracts: {},
  get: [],
  user: [],
  id: 0,
  title: "",
};
