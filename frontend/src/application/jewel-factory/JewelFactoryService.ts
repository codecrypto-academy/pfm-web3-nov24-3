import { BrowserProvider } from "ethers";
import { JewelFactorySC } from "@/infraestructure/JewelFactorySC";
import { MaterialInventory } from "@/infraestructure/IJewelFactory";

export class JewelFactoryService {
  private jewelFactorySC: JewelFactorySC;

  constructor(provider: BrowserProvider) {
    this.jewelFactorySC = new JewelFactorySC(provider);
  }

  async getAllMaterialsInventory(): Promise<MaterialInventory[]> {
    try {
      return await this.jewelFactorySC.getAllMaterialsInventory();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Error desconocido al obtener el inventario');
    }
  }
} 