import {signalStore, withComputed, withMethods, withProps, withState} from '@ngrx/signals';
import {ShopStore} from '../../../store/shop.store';
import {computed, inject} from '@angular/core';
import {buildProductListVm} from './product-list.builder';

type ProductListState = {}

const initialState: ProductListState = {}

export const ProductListStore = signalStore(
  withState(initialState),
  withProps(_ => ({
    _shopStore: inject(ShopStore)
  })),
  withMethods(store => ({
    viewCart: store._shopStore.viewCart,
    addToCart: store._shopStore.addToCart,
  })),
  withComputed((store) => ({
    vm: computed(() => buildProductListVm(
      store._shopStore.products(),
      store._shopStore.cartQuantities(),
      store._shopStore.term()
    ))
  }))
)
