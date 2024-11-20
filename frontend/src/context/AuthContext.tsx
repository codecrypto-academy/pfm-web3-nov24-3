"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ethers } from "ethers";
import { BrowserProvider } from "ethers";

interface AuthContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnected: boolean;
  provider: BrowserProvider | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  const connect = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAddress(accounts[0]);
        localStorage.setItem("walletConnected", "true");
      } else {
        alert("Por favor, instala MetaMask");
      }
    } catch (error) {
      console.error("Error al conectar:", error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    localStorage.removeItem("walletConnected");
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (localStorage.getItem("walletConnected") === "true") {
        await connect();
      }
    };
    checkConnection();
  }, []);

  return (
    <AuthContext.Provider
      value={{ address, connect, disconnect, isConnected: !!address, provider }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
