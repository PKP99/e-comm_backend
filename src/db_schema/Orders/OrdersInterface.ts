export interface IOrders {
  order_id: string;
  user_id: string;
  product_id: string;
  status: string;
  item_subtotal: number;
  shipping_price: number;
  total_price: number;
  payment_method: string;
  shipping_address: string;
  shipped_to: string;
  transaction_id: string;
  order_date: number;
  delivery_date: number;
}
