import {ProductItemVm} from '../components/items-list/view-model/product-item.vm';
import {CartItemVm} from '../components/cart/view-model/cart-item.vm';

export interface ProductListVm {
  productItems: ProductItemVm[];
}

export interface CartVm {
  items: CartItemVm[];
  itemsCount: number;
  subtotal: number;
  tax: number;
  total: number;
  isVisible: boolean;
  isActive: boolean;
}
