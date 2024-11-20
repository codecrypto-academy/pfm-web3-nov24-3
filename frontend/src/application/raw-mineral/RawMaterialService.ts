import { IJewelChainRequest, RawMineralForm } from "@/domain/raw-mineral/RawMineral";
import { defaultAbiCoder, encodeBytes32String } from "../EthersUtils";
import { BrowserProvider, TransactionReceipt } from "ethers";
import { IJewelChain } from "@/infraestructure/IJewelChain";
import { RawMineralSC } from "@/infraestructure/RawMineralSC";

export class RawMineralService {
  private rawMineralSC: IJewelChain;
  constructor(provider: BrowserProvider) {
    this.rawMineralSC = new RawMineralSC(provider);
  }

  public async createRawMineral(rawMineral: RawMineralForm): Promise<string> {
    const nameBytes = encodeBytes32String(rawMineral.name);
    const dataBytes = defaultAbiCoder(['uint256', 'string'], [rawMineral.quality, rawMineral.origin]);

    const jewelRawMinetal: IJewelChainRequest = {
      name: nameBytes,
      date: rawMineral.date,
      quantity: rawMineral.quantity,
      data: dataBytes,
    };

    const tx: TransactionReceipt = await this.rawMineralSC.createJewelRecord(jewelRawMinetal);
    return tx.hash;
  }


}