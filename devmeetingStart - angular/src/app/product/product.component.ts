import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../Types';

@Component({
  selector: 'app-product',
  template: `
    <article class="product" [ngClass]="{promote: product.promote}">

        <app-product-title [title]="product.title"></app-product-title>
        <h4>{{product.price}}</h4>
    </article>
  `,
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  constructor() {
  }

  ngOnInit() {
  }

}
