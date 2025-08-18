import {ProductItemVm} from '../feature/product-list/components/view-model/product-item.vm';
import {CartItemVm} from '../feature/cart/view-model/cart-item.vm';

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
