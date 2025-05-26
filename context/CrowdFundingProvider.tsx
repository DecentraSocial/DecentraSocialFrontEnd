"use client";

import React, { createContext, useReducer, ReactNode, Dispatch, Reducer } from "react";
import { StateType, ActionType } from "./CrowdFundingReducer";

export const CrowdFundingContext = createContext<
  [StateType, Dispatch<ActionType>] | undefined
>(undefined);

interface Props {
  reducer: Reducer<StateType, ActionType>;
  initialState: StateType;
  children: ReactNode;
}

export const CrowdFundingProvider: React.FC<Props> = ({
  reducer,
  initialState,
  children,
}) => {
  const value = useReducer(reducer, initialState);
  return (
    <CrowdFundingContext.Provider value={value}>
      {children}
    </CrowdFundingContext.Provider>
  );
};

export const useCrowdFunding = () => {
  const context = React.useContext(CrowdFundingContext);
  if (!context) {
    throw new Error("useCrowdFunding must be used within a CrowdFundingProvider");
  }
  return context;
};
