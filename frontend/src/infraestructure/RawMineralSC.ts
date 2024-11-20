import { IJewelChainRequest, IJewelChainResponse } from "@/domain/raw-mineral/RawMineral";
import { IJewelChain } from "./IJewelChain";
import { BrowserProvider, TransactionReceipt, TransactionResponse } from "ethers";
import { Contract } from "ethers";
import { RAW_MINERAL_ABI } from "@/abis/raw-mineral";


export class RawMineralSC implements IJewelChain {

  private provider: BrowserProvider;

  constructor(provider: BrowserProvider) {
    this.provider = provider;
  }

  async createJewelRecord(jewelRawMineral: IJewelChainRequest): Promise<TransactionReceipt> {
    const contract: Contract = await this.getContractRawMineal();
    const gasEstimate: bigint = await contract.createJewelRecord.estimateGas(jewelRawMineral.name, jewelRawMineral.date, jewelRawMineral.quantity, jewelRawMineral.data);

    const rawMineralCreate: TransactionResponse = await contract.createJewelRecord(jewelRawMineral.name, jewelRawMineral.date, jewelRawMineral.quantity, jewelRawMineral.data, { gasLimit: gasEstimate });
    const rawMineralTransaction: TransactionReceipt | null = await rawMineralCreate.wait();
    if (rawMineralTransaction == null) {
      throw Error('Transaction failed');
    }
    return rawMineralTransaction;
  }

  async getJewelRecordBySupplier(providerAddress: string): Promise<IJewelChainResponse[]> {
    const contract: Contract = await this.getContractRawMineal();
    const rawMineral: IJewelChainResponse[] = await contract.getJewelRecordBySupplier(providerAddress);
    return rawMineral;
  }

  async getContractRawMineal(): Promise<Contract> {
    const signer = await this.provider.getSigner();
    return new Contract("0x701861C86bb5eCE7eeA2ca23e89fAf35d6DA0260", RAW_MINERAL_ABI, signer)
  }

}