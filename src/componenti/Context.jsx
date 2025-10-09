import { createContext, useState } from "react";

export const RicercaContext = createContext();

export const RicercaProvider = ({ children }) => {
  const [valore, impostaValore] = useState("");

  return (
    <RicercaContext.Provider value={{ valore, impostaValore }}>
      {children}
    </RicercaContext.Provider>
  );
};