export type UserRole = 'ADMIN_ROLE' | 'RAW_MINERAL_ROLE' | 'JEWEL_FACTORY_ROLE' | 'DISTRIBUTOR_ROLE' | 'STORE_ROLE' | 'UNKNOWN_ROLE';

export interface User {
  user?: string; // TODO remove this and fix the contract
  address: string;  // Dirección de MetaMask
  role: UserRole;
  name: string;
  companyName?: string;
  isActive: boolean;
}

export interface LoginCredentials {
  address: string;
  signature: string;
} 