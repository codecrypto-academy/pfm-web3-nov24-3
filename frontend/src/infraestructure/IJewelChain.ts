import { IJewelChainRequest, IJewelChainResponse, JewelOrderResponse } from "@/domain/raw-mineral/RawMineral";
import { TransactionReceipt } from "ethers";

export interface IJewelChain {
  createJewelRecord(jewelRawMineral: IJewelChainRequest): Promise<TransactionReceipt>;
  getJewelRecordBySupplier(providerAddress: string): Promise<IJewelChainResponse[]>;
  orderMaterial(provider: string, uniqueId: string): Promise<TransactionReceipt>;
  getJewelOrder(): Promise<JewelOrderResponse[]>;
  getJewelSupplierByIndex(uniqueId: string): Promise<IJewelChainResponse>;
  sendMaterial(uniqueId: string, indexOrder: number): Promise<TransactionReceipt>
}