import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-title',
  template: `
    <h3>Product title component - {{title}}</h3>
  `,
  styleUrls: ['./product-title.component.css']
})
export class ProductTitleComponent implements OnInit {
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
