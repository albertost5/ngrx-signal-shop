import {PartialStateUpdater} from '@ngrx/signals';
import {ShopState} from './shop.store';

export const setTerm = (term: string) => ({term});

export function viewCart(): PartialStateUpdater<ShopState> {
  return _ => ({isCartVisible: true});
}

export function hideCart(): PartialStateUpdater<ShopState> {
  return _ => ({isCartVisible: false});
}

export function addToCart(productId: string): PartialStateUpdater<ShopState> {
  return (state) => {
    const cartQuantities = {...state.cartQuantities}
    cartQuantities[productId] = cartQuantities[productId] + 1 || 1;
    return {cartQuantities};
  }
}

export function incrementQuantity(productId: string): PartialStateUpdater<ShopState> {
  return addToCart(productId);
}

export function decrementQuantity(productId: string): PartialStateUpdater<ShopState> {
  return (state) => {
    const cartQuantities = {...state.cartQuantities};
    const productQuantity = cartQuantities[productId] - 1;
    if (productQuantity > 0) {
      cartQuantities[productId] = productQuantity;
    } else {
      delete cartQuantities[productId];
    }

    return {cartQuantities};
  }
}

export function checkout(): PartialStateUpdater<ShopState> {
  return _ => ({
    cartQuantities: {},
    isCartVisible: false,
  });
}
