'use client';

import {
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';

export type CheckboxContextType = {
  selected: Set<string>;
  setSelected: Dispatch<SetStateAction<Set<string>>>;
  opened: Set<string>;
  setOpened: Dispatch<SetStateAction<Set<string>>>;
};

export const CheckboxContext = createContext<CheckboxContextType>({
  selected: new Set(),
  setSelected: () => {},
  opened: new Set(),
  setOpened: () => {},
});

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
