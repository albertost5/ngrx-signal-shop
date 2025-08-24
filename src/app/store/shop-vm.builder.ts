import {CartQuantities} from './shop.store';
import {ShopVm} from './shop.vm';

export function buildShopVm(cartQuantities: CartQuantities, isCartVisible: boolean): ShopVm {
  const itemsCount = Object.entries(cartQuantities).length;

  return {
    isCartActive: itemsCount > 0,
    isCartVisible,
    cartItemsCount: itemsCount
  }
}
