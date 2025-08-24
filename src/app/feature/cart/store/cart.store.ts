import {signalStore, withComputed, withMethods, withProps, withState} from '@ngrx/signals';
import {ShopStore} from '../../../store/shop.store';
import {computed, inject} from '@angular/core';
import {buildCartVm} from './cart-vm.builder';

type CartState = {
  taxRate: number;
}

const initialState: CartState = {
  taxRate: 0.08
}

export const CartStore = signalStore(
  withState(initialState),
  withProps(_ => ({
    _shopStore: inject(ShopStore)
  })),
  withMethods((store) => ({
    incrementQuantity: store._shopStore.incrementQuantity,
    decrementQuantity: store._shopStore.decrementQuantity,
    checkout: store._shopStore.checkout,
    hideCart: store._shopStore.hideCart,
  })),
  withComputed(store => ({
    vm: computed(() => buildCartVm(
      store._shopStore.products(),
      store._shopStore.cartQuantities(),
      store.taxRate(),
      store._shopStore.isCartVisible()
    ))
  }))
)
