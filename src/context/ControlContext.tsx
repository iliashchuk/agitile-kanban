import React, { createContext, useState } from 'react';

interface IControlContext {
  isBoardMode: boolean;
  setIsBoardMode(isBoardMode: boolean): void;
}

export const ControlContext = createContext<IControlContext>(
  {} as IControlContext
);

export const ControlProvider: React.FC = ({ children }) => {
  const [isBoardMode, setBoardMode] = useState(true);

  return (
    <ControlContext.Provider
      value={{ isBoardMode, setIsBoardMode: setBoardMode }}
    >
      {children}
    </ControlContext.Provider>
  );
};
