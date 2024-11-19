export {};

declare global {
  interface Window {
    ethereum?: any; // Puedes usar un tipo más específico si tienes una definición de `ethereum`.
  }
}
