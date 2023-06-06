'use client';

import {
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  createContext,
  useMemo,
  useState,
  useContext,
} from 'react';

type CheckboxContextType = {
  selected: Set<string>;
  setSelected: Dispatch<SetStateAction<Set<string>>>;
  opened: Set<string>;
  setOpened: Dispatch<SetStateAction<Set<string>>>;
};

const CheckboxContext = createContext<CheckboxContextType | null>(null);

export const useCheckboxContext = () => {
  const context = useContext(CheckboxContext);

  if (!context) {
    throw new Error(
      'CheckboxProvider provider is not available. Make sure to wrap your component with CheckboxProvider.'
    );
  }

  return context;
};

export const CheckboxProvider = ({ children }: { children: ReactNode }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [opened, setOpened] = useState<Set<string>>(new Set());

  const contextValue = useMemo(
    () => ({
      selected,
      setSelected,
      opened,
      setOpened,
    }),
    [selected, setSelected, opened, setOpened]
  );

  return (
    <CheckboxContext.Provider value={contextValue}>
      {children}
    </CheckboxContext.Provider>
  );
};
