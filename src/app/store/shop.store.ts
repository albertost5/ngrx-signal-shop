import {computed} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {Product} from '../models/product.model';
import {buildCartVm, buildProductListVm} from './shop-vm.builder';
import {ALL_PRODUCTS} from '../data/all-products';
import * as updaters from './shop.updaters';

export type ShopState = {
  products: Product[];
  term: string;
  cartQuantities: Record<string, number>;
  isCartVisible: boolean;
  taxRate: number;
}

const initialState: ShopState = {
  products: ALL_PRODUCTS,
  term: '',
  cartQuantities: {},
  isCartVisible: false,
  taxRate: 0.08
}

export const ShopStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withComputed(({products, term, cartQuantities, isCartVisible, taxRate}) => ({
    productListVm: computed(() => buildProductListVm(products(), cartQuantities(), term())),
    cartVm: computed(() => buildCartVm(products(), cartQuantities(), taxRate(), isCartVisible()))
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
  }))
);
