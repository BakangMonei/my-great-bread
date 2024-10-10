// AppContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface AppState {
  isLoggedIn: boolean;
  user: string | null;
}

interface AppContextProps {
  state: AppState;
  updateState: (newState: Partial<AppState>) => void;
}

const initialState: AppState = {
  isLoggedIn: false,
  user: null,
};

const AppContext = createContext<AppContextProps>({
  state: initialState,
  updateState: () => {},
});

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(initialState);

  const updateState = (newState: Partial<AppState>) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <AppContext.Provider value={{ state, updateState }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
