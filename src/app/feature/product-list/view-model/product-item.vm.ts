import {Product} from "../../../models/product.model";

export interface ProductItemVm extends Product {
  readonly quantity: number;
}
