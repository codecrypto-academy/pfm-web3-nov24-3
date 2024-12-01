export interface MaterialInventory {
  materialId: string;
  quantity: number;
  supplier: string;
}

export interface IJewelFactory {
  getAllMaterialsInventory(): Promise<MaterialInventory[]>;
} 