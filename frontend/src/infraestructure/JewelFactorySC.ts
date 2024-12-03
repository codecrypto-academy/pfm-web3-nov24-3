import { BrowserProvider, Contract, ethers } from "ethers";
import { IJewelFactory, MaterialInventory, Jewel, CreateJewelDTO } from "./IJewelFactory";
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

  async getAllJewels(): Promise<Jewel[]> {
    const contract = await this.getContract();
    const jewels = await contract.getAllJewels();
    
    return jewels.map((jewel: any) => ({
        tokenId: Number(jewel.tokenId),
        name: ethers.decodeBytes32String(jewel.name),
        creationDate: Number(jewel.creationDate),
        creator: jewel.creator,
        materials: jewel.materials.map((m: any) => ({
            materialId: m.materialId,
            quantity: Number(m.quantity)
        })),
        data: jewel.data,
        ownershipHistory: jewel.ownershipHistory,
        totalSupply: Number(jewel.totalSupply)
    }));
  }

  async createJewel(jewel: CreateJewelDTO): Promise<number> {
    const contract = await this.getContract();
    
    const name = ethers.encodeBytes32String(jewel.name);
    const materials = jewel.materials.map(m => [m.materialId, m.quantity]);
    const data = ethers.AbiCoder.defaultAbiCoder().encode(
        ["uint256", "string", "string"],
        [jewel.data.quality, jewel.data.design, jewel.data.certification]
    );
    
    const tx = await contract.createJewel(name, jewel.quantity, materials, data);
    const receipt = await tx.wait();
    
    const event = receipt.logs.find(
        (log: any) => log.topics[0] === contract.interface.getEventTopic('JewelCreated')
    );
    
    if (event) {
        const decodedEvent = contract.interface.decodeEventLog(
            'JewelCreated',
            event.data,
            event.topics
        );
        return Number(decodedEvent.tokenId);
    }
    
    throw new Error('No se pudo obtener el ID de la joya creada');
  }
} 