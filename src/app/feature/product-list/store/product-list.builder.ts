import {Product} from '../../../models/product.model';
import {ProductItemVm} from '../view-model/product-item.vm';
import {ProductListVm} from '../view-model/product-list.vm';


export function buildProductListVm(products: Product[], quantities: Record<string, number>, term: string): ProductListVm {
  return {
    productItems: buildProductItems()
  }

  function buildProductItems(): ProductItemVm[] {
    return products
      .filter(p => p.name.toLowerCase().includes(term.toLowerCase()))
      .map(p => ({
        ...p,
        quantity: quantities[p.id] || 0,
      }));
  }
}
