'use client'; 

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface AuthContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);

  const connect = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAddress(accounts[0]);
        localStorage.setItem('walletConnected', 'true');
        
        // Agregar listener para cambios de cuenta
        window.ethereum.on('accountsChanged', (newAccounts: string[]) => {
            if (newAccounts.length === 0) {
              // Si no hay cuentas, desconectar
              disconnect();
            } else {
              // Actualizar con la nueva cuenta
              setAddress(newAccounts[0]);
            }
          });
      } else {
        alert('Por favor, instala MetaMask');
      }
    } catch (error) {
      console.error('Error al conectar:', error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    localStorage.removeItem('walletConnected');
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (localStorage.getItem('walletConnected') === 'true') {
        await connect();
      }
    };
    checkConnection();
  }, []);

  return (
    <AuthContext.Provider value={{ address, connect, disconnect, isConnected: !!address }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 