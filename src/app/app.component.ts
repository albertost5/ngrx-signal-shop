import {Component, inject} from '@angular/core';
import {SharedModule} from './shared.module';
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {ItemsListComponent} from "./feature/product-list/components/items-list.component";
import {CartComponent} from "./feature/cart/cart.component";
import {ShopStore} from './store/shop.store';

@Component({
  selector: 'app-root',
  imports: [SharedModule, ToolbarComponent, ItemsListComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  store = inject(ShopStore)
  readonly isCartShowing = this.store.isCartVisible;
}
