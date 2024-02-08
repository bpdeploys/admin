import { createContext, useContext, useState } from 'react';

const SportsmappContext = createContext(null);

export const useSportsmappContext = () => useContext(SportsmappContext);

export const SportsmappProvider = ({ children }) => {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedLeague, setSelectedLeague] = useState(null);

  const selectProvider = (provider) => {
    setSelectedProvider(provider);
    // Reset the other selections
    setSelectedVenue(null);
    setSelectedLeague(null);
  };

  const selectVenue = (venue) => {
    setSelectedVenue(venue);
    setSelectedLeague(null);
  };

  const selectLeague = (league) => {
    setSelectedLeague(league);
  };

  const value = {
    selectedProvider,
    selectProvider,
    selectedVenue,
    selectVenue,
    selectedLeague,
    selectLeague,
  };

  return (
    <SportsmappContext.Provider value={value}>
      {children}
    </SportsmappContext.Provider>
  );
};
