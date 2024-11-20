export interface IJewelChainBase {
  name: string;
  date: number;
  quantity: number;
}

export interface RawMineralForm extends IJewelChainBase {
  quality: number;
  origin: string;
};

export interface IJewelChainRequest extends IJewelChainBase {
  data: string;
};