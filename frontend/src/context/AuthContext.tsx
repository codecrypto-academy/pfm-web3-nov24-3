'use client'; 

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { USER_ABI } from '@/lib/abi/user';
import { User } from '@/types/user';
interface AuthContextType {
  user: User | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
}
const ADDRESS = "0xA15BB66138824a1c7167f5E85b957d04Dd34E468"  //process.env.NEXT_PUBLIC_USER_CONTRACT_ADDRESS;

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const connect = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);

        window.ethereum.on('accountsChanged', handleAccountsChanged);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(ADDRESS, USER_ABI, signer);
        await contract.getUser(accounts[0]).then((user) => {
          if (!user[2]) { // Check if user is not active
            alert('Tu cuenta está desactivada. Por favor, contacta al administrador.');
            return null;
          }
          setUser({
            address: user[0],
            role: user[1], 
            isActive: user[2],
            name: user[3],
          });
        }).catch((error) => {
          console.error('Error al obtener el usuario:', error);
          alert('Tu cuenta no está registrada en la plataforma.');
          return null;
        });
      } else {
        alert('Por favor, instala MetaMask');
      }
    } catch (error) {
      console.error('Error al conectar:', error);
    }
  };

  const disconnect = () => {
    setUser(null);
    localStorage.removeItem('walletConnected');
  };

  const handleAccountsChanged = () => {
    disconnect();
    connect();
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
    <AuthContext.Provider value={{ user, connect, disconnect, isConnected: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext); 