import { IJewelChainRequest, IJewelChainResponse, RawMineralChain, RawMineralForm, RecordType } from "@/domain/raw-mineral/RawMineral";
import { defaultAbiCoderEncode, defaultAbiCoderDecode, encodeBytes32String, decodeBytes32String, weiToUnit, unitToWei } from "../EthersUtils";
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
    const dataBytes = defaultAbiCoderEncode(['uint256', 'string'], [rawMineral.quality, rawMineral.origin]);

    const jewelRawMinetal: IJewelChainRequest = {
      name: nameBytes,
      date: weiToUnit(Number(rawMineral.date)),
      quantity: weiToUnit(Number(rawMineral.quantity)),
      data: dataBytes,
    };

    const tx: TransactionReceipt = await this.rawMineralSC.createJewelRecord(jewelRawMinetal);
    return tx.hash;
  }

  public async getJewelRecordBySupplier(addressSuplier: string): Promise<RawMineralChain[]> {
    const rawMineralFromSC: IJewelChainResponse[] = await this.rawMineralSC.getJewelRecordBySupplier(addressSuplier);

    const rawMineral: RawMineralChain[] = rawMineralFromSC.map(mineral => {
      const [quality, origin] = defaultAbiCoderDecode(['uint256', 'string'], mineral.data);
      return {
        supplier: mineral.supplier,
        uniqueId: mineral.uniqueId,
        name: decodeBytes32String(mineral.name),
        date: unitToWei(Number(mineral.date)),
        quantity: unitToWei(Number(mineral.quantity)),
        quality: Number(unitToWei(Number(quality))),
        origin: origin as string,
        recordType: RecordType.MATERIAL,
        data: mineral.data
      }
    });

    return rawMineral;
  }


}