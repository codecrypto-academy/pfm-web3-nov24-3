import { RawMineralForm } from "@/domain/raw-mineral/RawMineral";
import { defaultAbiCoder, encodeBytes32String } from "../EthersUtils";

export class RawMineral {
  constructor() { }

  public createRawMineral(rawMineral: RawMineralForm): void {
    const nameBytes = encodeBytes32String(rawMineral.name);
    const dataBytes = defaultAbiCoder(['uint256', 'uint256'], [rawMineral.quality, rawMineral.origin]);
  }
}