import { BrowserProvider, Contract } from "ethers";
import { IJewelFactory, MaterialInventory } from "./IJewelFactory";
import { JEWEL_FACTORY_ABI } from "@/abis/jewel-factory";

export class JewelFactorySC implements IJewelFactory {
  private provider: BrowserProvider;

  constructor(provider: BrowserProvider) {
    this.provider = provider;
  }

  private async getContract(): Promise<Contract> {
    const signer = await this.provider.getSigner();
    return new Contract(
      process.env.NEXT_PUBLIC_JEWEL_FACTORY_CONTRACT_ADDRESS!,
      JEWEL_FACTORY_ABI,
      signer
    );
  }

  async getAllMaterialsInventory(): Promise<MaterialInventory[]> {
    const contract = await this.getContract();
    const [ids, inventories] = await contract.getAllMaterialsInventory();
    return inventories.map((inventory: any, index: number) => ({
      materialId: ids[index],
      quantity: Number(inventory.quantity),
      supplier: inventory.supplier
    }));
  }
} 