import * as React from 'react';
import reducer, {initialState, IStates} from '../reducers';

export type IPlanets = {
  name: string;
  distance: number;
  isSelected: boolean;
};

export type IVehicles = {
  name: string;
  total_no: number;
  max_distance: number;
  speed: number;
  isSelected: boolean;
  label: string;
};
export type AppContextType = {
  planets: IPlanets[];
  vehicles: IVehicles[];
};
export type IContextType = {
  state: IStates;
  dispatch: React.Dispatch<any>;
};
export const AppContext = React.createContext<IContextType>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC<React.ReactNode> = ({children}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
