import { createContext } from 'react';

const HabitControlsContext = createContext({
  openedControl: null,
  setOpenedControl: () => {},
});

export default HabitControlsContext;