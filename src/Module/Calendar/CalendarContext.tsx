import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

type CalendarContextType = {
  focusMonth: Date;
  setFocusMonth: React.Dispatch<React.SetStateAction<Date>>;
};
const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined,
);

type CalendarProviderProps = {
  children: ReactNode;
  setFocusMonth: Dispatch<SetStateAction<Date>>;
  focusMonth: Date;
};

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
  setFocusMonth,
  focusMonth,
}) => {
  return (
    <CalendarContext.Provider value={{ focusMonth, setFocusMonth }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider",
    );
  }
  return context;
};
