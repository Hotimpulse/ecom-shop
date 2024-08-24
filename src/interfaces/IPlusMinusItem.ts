export interface IPlusMinusItem {
  count: number;
  id: number;
  totalStock: number;
  handleDeleteItem?: () => void;
  lastProductDisable?: boolean;
}
