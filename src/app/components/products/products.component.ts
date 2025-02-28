import { Component,Signal } from '@angular/core';
import { AddProductsService } from '../../services/add-products.service';
import { Product } from '../../interfaces/product.product';
import { OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
@Component({
  selector: 'app-products',
  imports: [ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Signal<Product[]>;
  size: number = 0;
  constructor(private productService: AddProductsService) {
    this.products = this.productService.getProducts();
  }
  ngOnInit() {
    // Llamamos al método para obtener los productos en el ciclo de vida OnInit
     //si no lo hago de esta manera y lo junto, da problemas al intentar meter un signal de array de productos a un array de productos
    console.log('products:'+this.products);
    this.size = this.products.length;
  }
}
