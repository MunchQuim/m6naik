import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../interfaces/product.product';
import { CommonModule } from '@angular/common';
import { AddProductsService } from '../../services/add-products.service';
import { ProductsComponent } from '../products/products.component';
@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  naikForm: FormGroup; //lo creamos, tipamos pero no le damos ningun valor

  constructor(private productService: AddProductsService) {//se coloca en el () para inyectar las dependencias en la construccion del componenente
    this.naikForm = new FormGroup({//en este momento si lo estamos creando como un grupo de formControls
      id: new FormControl('', Validators.required),//debere cambiar este validador para que no permita valores repetidos
      nombre: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(0), Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]),
      descripcion: new FormControl(''),
      tipo: new FormControl('', Validators.required),
      oferta: new FormControl(false),
      descuento: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(95)]),
      imagen: new FormControl('', Validators.required)
    });
  }
  saveData() {
    if (this.naikForm.valid) {

      const newProduct: Product = this.naikForm.value;
      this.productService.addProduct(newProduct);
      console.log('Producto guardado:', newProduct);
      console.log('todos los productos:',this.productService.getProducts()());
      // Reiniciar el formulario después de guardar
      this.naikForm.reset({ oferta: false, descuento:0});
    }
  }

  onFileSelected(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    
    if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0]; // Captura el archivo
        console.log('Archivo seleccionado:', file);
        
        // Puedes almacenarlo en el formulario si es necesario
        this.naikForm.patchValue({ imagen: file });
        this.naikForm.get('imagen')?.updateValueAndValidity();
    }
}

}
