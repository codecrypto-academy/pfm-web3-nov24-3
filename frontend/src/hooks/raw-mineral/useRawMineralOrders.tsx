import { RawMineralService } from "@/application/raw-mineral/RawMaterialService";
import { BrowserProvider } from "ethers";
import { useCallback, useEffect, useState } from "react";

let rawMineralService: RawMineralService;
export const useRawMineralOrders = (provider: BrowserProvider | null) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (provider) {
      rawMineralService = new RawMineralService(provider);
    }
  }, [provider]);

  const orderMineral = useCallback(
    async (address: string, uniqueId: string) => {
      if (!rawMineralService) return;
      try {
        setIsLoading(true);
        const txHash = await rawMineralService.orderMaterial(address, uniqueId);
        return txHash;
      } catch (err) {
        console.error("Error to order mineral:", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    isLoading,
    orderMineral,
  };
};
