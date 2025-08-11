import {Product} from '../models/product.model';
import {ALL_PRODUCTS} from '../data/all-products';
import {signalStore, withState} from '@ngrx/signals';

type ShopState = {
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
  withState(initialState)
)
