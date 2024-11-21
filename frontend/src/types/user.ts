export type UserRole = 'miner' | 'manufacturer' | 'distributor' | 'retailer' | 'customer';

export interface User {
  address: string;  // Dirección de MetaMask
  role: UserRole;
  name?: string;
  companyName?: string;
  isActive: boolean;
}

export interface LoginCredentials {
  address: string;
  signature: string;
} 