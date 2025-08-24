import {Product} from '../../../models/product.model';
import {CartItemVm} from '../view-model/cart-item.vm';
import {CartVm} from '../view-model/cart.vm';

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
