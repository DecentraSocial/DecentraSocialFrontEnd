"use client";

export interface StateType {
  providers: Record<string, unknown>;
  accounts: string;
  contracts: Record<string, unknown>;
  get: any[];
  user: any[];
  id: number;
  title: string;
}

export type ActionType =
  | { type: "SET_ACCOUNT"; account: string }
  | { type: "SET_PROVIDER"; providers: Record<string, unknown> }
  | { type: "SET_CONTRACT"; contract: any }
  | { type: "GET_ALL_COMPAIGN"; get: any[] }
  | { type: "SET_DONATE"; donate: number }
  | { type: "SET_TITLE"; title: string }
  | { type: "SET_USER_CAMPAIGN"; user: any[] };

export const initialState: StateType = {
  providers: {},
  accounts: "0x048a33def606db075f4cbc2f2ed7d313af8e1267",
  contracts: {},
  get: [],
  user: [],
  id: 0,
  title: "",
};

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_ACCOUNT":
      return {
        ...state,
        accounts: action.account,
      };

    case "SET_PROVIDER":
      return {
        ...state,
        providers: action.providers,
      };

    case "SET_CONTRACT":
      return {
        ...state,
        contracts: action.contract,
      };
    case "GET_ALL_COMPAIGN":
      return {
        ...state,
        get: action.get,
      };

    case "SET_DONATE":
      return {
        ...state,
        id: action.donate,
      };

    case "SET_TITLE":
      return {
        ...state,
        title: action.title,
      };

    case "SET_USER_CAMPAIGN":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
export default reducer;
