"use client";

import { createContext, use, useState } from "react";

const initialState = {
  from: undefined,
  to: undefined,
};

const ReservationContext = createContext(initialState);

function ReservationProvider({ children }) {
  const [range, setRange] = useState();
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = use(ReservationContext);

  if (context === undefined)
    throw new Error("Context was used outside Provider");

  return context;
}

export { ReservationProvider, useReservation };
