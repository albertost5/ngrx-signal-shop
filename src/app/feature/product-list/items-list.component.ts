import {Component, inject} from '@angular/core';
import {ItemCardComponent} from "./components/item-card/item-card.component";
import {ProductListStore} from './store/product-list.store';

@Component({
  selector: 'app-items-list',
  imports: [ItemCardComponent],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.scss',
  providers: [ProductListStore],
})
export class ItemsListComponent {
  store = inject(ProductListStore);
}
