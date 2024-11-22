import { IJewelChainRequest, IJewelChainResponse } from "@/domain/raw-mineral/RawMineral";
import { TransactionReceipt } from "ethers";

export interface IJewelChain {
  createJewelRecord(jewelRawMineral: IJewelChainRequest): Promise<TransactionReceipt>;
  getJewelRecordBySupplier(providerAddress: string): Promise<IJewelChainResponse[]>;
}