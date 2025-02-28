import { Component, input } from '@angular/core';
import { Input } from '@angular/core';
import { Product } from '../../interfaces/product.product';
@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product?: Product;
  
  get precioFinal(): number | undefined {
    if (this.product) {
      return this.product.precio * (100 - this.product.descuento) / 100;
    }
    return undefined;
  }
}
