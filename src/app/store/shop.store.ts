import {Product} from '../models/product.model';
import {ALL_PRODUCTS} from '../data/all-products';
import {signalStore, withComputed, withState} from '@ngrx/signals';
import {computed} from '@angular/core';
import {buildCartVm, buildProductListVm} from './shop-vm.builder';

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
  }))
)
