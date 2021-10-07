import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  @Input()
  product!: Product;
  @Output() removeProduct = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.product)
  }

  deleteProduct(productId: number){
    this.removeProduct.emit(productId);
  }

}
