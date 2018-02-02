import { Component, Injectable } from "@angular/core";
import { Http } from '@angular/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { Product } from './Types';

@Injectable()
export class ProductRepository {

    direction$ = new BehaviorSubject(false);

    list: Array<Product> = [];

    source$: Observable<Array<Product>>;

    constructor(http: Http) {
        this.list = [
            {
                title: 'Product1',
                price: 11,
                promote: false,
                tags: ['tag1', 'tag2', 'tag3']
            },
            {
                title: 'Product2',
                price: 22,
                promote: false,
                tags: ['tag4']
            },
            {
                title: 'Product3',
                price: 1000000,
                promote: true,
                tags: []
            },
            {
                title: 'Pro zzz aaa',
                price: 1000000,
                promote: true,
                tags: []
            },
            {
                title: 'Pro zzz bbb',
                price: 1000000,
                promote: true,
                tags: []
            }
        ];

        const url = 'https://shining-torch-4509.firebaseio.com/products.json';
        this.source$ = http.get(url)
            .retry(5)
            .map(value => value.json())
            .map(products => {
                console.info('products', products);
                const out = [];
                for (const key of Object.keys(products)) {
                    out.push(products[key]);
                }
                console.info('out ', out);
                return out;
            })
            .map((items: Array<any>): Array<Product> => {
                return items.map((item: any): Product => ({
                    title: item.name,
                    price: item.price,
                    promote: false,
                    tags: []
                })); 
            });
        ;
    }

    public getList($phrase: Observable<string>): Observable<Array<Product>> {

        const outlist$ = Observable.combineLatest(
            $phrase,
            this.source$,
            (phrase: string, source: Array<Product>): Array<Product> => {
                return source.filter(item => item.title.indexOf(phrase) >= 0)
            }
        );
/*
        const outlist$ = $phrase.map(phrase =>
            this.list.filter(item => item.title.indexOf(phrase) >= 0)
        );
*/
        return Observable.combineLatest(
            this.direction$,
            outlist$,
            (direction: boolean, outlist: Array<Product>): Array<Product> => {
                if (direction === false) {
                    return outlist;
                } else {
                    const outlist2 = outlist.concat([]);
                    outlist2.reverse();
                    return outlist2;
                }
            }
        )
    }

    getToogleFn() {
        return () => {
            const current = this.direction$.getValue();
            this.direction$.next(!current);
        };
    }
}
