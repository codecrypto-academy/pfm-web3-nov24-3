import { useAuth } from "@/context/AuthContext";
import { JewelFactoryService } from "@/application/jewel-factory/JewelFactoryService";
import { MaterialInventory } from "@/infraestructure/IJewelFactory";
import { useState, useCallback } from "react";

export const useJewelFactoryService = () => {
  const { provider } = useAuth();
  const [inventory, setInventory] = useState<MaterialInventory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAllMaterialsInventory = useCallback(async () => {
    if (!provider) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const service = new JewelFactoryService(provider);
      const inventoryData = await service.getAllMaterialsInventory();
      setInventory(inventoryData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  }, [provider]);

  return {
    inventory,
    isLoading,
    error,
    getAllMaterialsInventory
  };
}; 