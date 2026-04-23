import React, { createContext, useContext, useState } from 'react';

const ConnectionContext = createContext(null);

export const ConnectionProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [walletOpen, setWalletOpen] = useState(false);

  const disconnect = () => setConnection(null);
  const connect = (data) => setConnection(data);

  return (
    <ConnectionContext.Provider
      value={{ connection, setConnection: connect, disconnect, walletOpen, setWalletOpen }}
    >
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const ctx = useContext(ConnectionContext);
  if (!ctx) throw new Error('useConnection must be used within ConnectionProvider');
  return ctx;
};
