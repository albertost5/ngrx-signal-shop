import {CartItemVm} from './cart-item.vm';

export interface CartVm {
  items: CartItemVm[];
  itemsCount: number;
  subtotal: number;
  tax: number;
  total: number;
  isVisible: boolean;
  isActive: boolean;
}
