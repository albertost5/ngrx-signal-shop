import {Product} from '../models/product.model';
import {CartVm, ProductListVm} from './shop.vm';
import {CartItemVm} from '../components/cart/view-model/cart-item.vm';
import {ProductItemVm} from '../components/items-list/view-model/product-item.vm';

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

export function buildCartVm(products: Product[], quantities: Record<string, number>, taxRate: number, cartVisible: boolean): CartVm {
  const items = buildCartItems();
  const subtotal = items.reduce((prev, current) => prev + current.total, 0);
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return {
    items,
    itemsCount: buildCartItems().length,
    subtotal,
    tax,
    total,
    isVisible: cartVisible,
    isActive: items.length > 0
  }

  function buildCartItems(): CartItemVm[] {
    return products
      .filter(p => quantities[p.id])
      .map(({id, name, unitPrice}) => {
        const quantity = quantities[id];

        return {
          id,
          name,
          price: unitPrice,
          quantity,
          total: unitPrice * quantity
        }
      });
  }
}
