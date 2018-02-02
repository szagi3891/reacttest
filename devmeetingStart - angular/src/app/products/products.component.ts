import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";

import 'rxjs/add/operator/map';
import * as Rx from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';

import { Product } from '../Types';
import { ProductRepository } from '../products';

@Component({
  selector: 'app-products',
  template: `
    <p (click)="myEvent($event)">
        products works!
    </p>

    Enter text: <input type="text" [formControl]="myInput" name="myInput">
    <br/><br/>
    <app-product *ngFor="let product of outlist | async" [product]="product"></app-product>
  `,
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    myInput:FormControl = new FormControl();
    outlist: Observable<Array<Product>>;
    toogle: () => void;

    constructor(productRepository: ProductRepository) {
        console.info('productRepository', productRepository);
        
        const $phrase: Observable<string> = Rx.Observable.from(this.myInput.valueChanges).startWith('');

        this.outlist = productRepository.getList($phrase);
        this.toogle = productRepository.getToogleFn();
    }

    myEvent(event) {
        console.log('event toogle', event);
        this.toogle();
    }

    ngOnInit() {
    }
}
