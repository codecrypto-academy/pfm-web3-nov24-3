export enum RecordType {
  MATERIAL,
  JEWEL
}

export interface IJewelChainBase {
  name: string;
  date: number | string;
  quantity: number | string;
}

export interface RawMineralForm extends IJewelChainBase {
  quality: number;
  origin: string;
};

export interface IJewelChainRequest extends IJewelChainBase {
  data: string;
};

export interface IJewelChainResponse extends IJewelChainRequest {
  supplier: string;
  uniqueId: string;
  recordType: RecordType;
}

export interface RawMineralChain extends IJewelChainBase, RawMineralForm, IJewelChainResponse { }