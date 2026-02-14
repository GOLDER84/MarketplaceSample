export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
}
export interface AddItemRequest {
  Name: string;
  Price: number;
  Description: string;
}
export interface BuyItemRequest {
  Username: string;
  ItemId: number;
}
