import { IJewelChainRequest, IJewelChainResponse, RawMineralChain, RawMineralForm, RecordType } from "@/domain/raw-mineral/RawMineral";
import { defaultAbiCoderEncode, defaultAbiCoderDecode, encodeBytes32String, decodeBytes32String, weiToUnit, unitToWei } from "../EthersUtils";
import { BrowserProvider, TransactionReceipt } from "ethers";
import { IJewelChain } from "@/infraestructure/IJewelChain";
import { RawMineralSC } from "@/infraestructure/RawMineralSC";

const mapImg: Record<string, string> = {
  Diamante: '/images/diamante.webp',
  Oro: '/images/oro.webp',
  Plata: '/images/plata.webp',
  Zafiro: '/images/zafiro.webp',
  Rubi: '/images/rubi.webp'
}


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
      const name: string = decodeBytes32String(mineral.name);
      return {
        supplier: mineral.supplier,
        uniqueId: mineral.uniqueId,
        name,
        date: unitToWei(Number(mineral.date)),
        quantity: unitToWei(Number(mineral.quantity)),
        quality: Number(unitToWei(Number(quality))),
        origin: origin as string,
        recordType: RecordType.MATERIAL,
        data: mineral.data,
        img: this.selectImgByName(name)
      }
    });

    return rawMineral;
  }

  private selectImgByName(name: string): string {
    const imgSrc: string | undefined = mapImg[name];

    return imgSrc === undefined ? '/images/default-jewel.webp' : imgSrc;
  }


}