import {computed, effect, Signal} from '@angular/core';
import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from '@ngrx/signals';
import {Product} from '../models/product.model';
import {ALL_PRODUCTS} from '../data/all-products';
import * as updaters from './shop.updaters';
import {buildShopVm} from './shop-vm.builder';

export type PersistedShop = Pick<ShopState, 'cartQuantities'>
export type CartQuantities = Record<string, number>;

export type ShopState = {
  products: Product[];
  term: string;
  cartQuantities: CartQuantities;
  isCartVisible: boolean;
}

const initialState: ShopState = {
  products: ALL_PRODUCTS,
  term: '',
  cartQuantities: {},
  isCartVisible: false,
}

export const ShopStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({cartQuantities, isCartVisible}) => ({
    vm: computed(() => buildShopVm(cartQuantities(), isCartVisible()))
  })),
  withMethods((store) => ({
    setTerm(term: string) {
      patchState(store, updaters.setTerm(term))
    },
    viewCart() {
      patchState(store, updaters.viewCart());
    },
    hideCart() {
      patchState(store, updaters.hideCart());
    },
    addToCart(productId: string) {
      patchState(store, updaters.addToCart(productId))
    },
    incrementQuantity: (productId: string) =>
      patchState(store, updaters.incrementQuantity(productId)),
    decrementQuantity: (productId: string) =>
      patchState(store, updaters.decrementQuantity(productId)),
    checkout: () =>
      patchState(store, updaters.checkout())
  })),
  withHooks({
    onInit(store) {
      const persistedShop: Signal<PersistedShop> = computed(() => ({
        cartQuantities: store.cartQuantities()
      }));

      if (localStorage.getItem('shop')) {
        patchState(store, JSON.parse(localStorage.getItem('shop')!))
      }

      effect(() => {
        const persistedValue = persistedShop();
        localStorage.setItem('shop', JSON.stringify(persistedValue))
      });
    }
  })
);
