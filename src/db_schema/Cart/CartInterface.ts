export interface ICartItem {
  id: string;
  user_id: string;
  product_id: string;
  variant: number; //will store index of array variant
  quantity: number;
}
