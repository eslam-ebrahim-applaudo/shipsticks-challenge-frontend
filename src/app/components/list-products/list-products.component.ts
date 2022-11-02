import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ProductCalculatorComponent } from '../product-calculator/product-calculator.component';
import { ProductFormComponent } from '../product-form/product-form.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'type', 'length', 'width', 'height', 'weight', 'actions'];
  products: Array<Product> = [];
  calculatedProduct: any = null;

  constructor(private productService: ProductsService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProducts()
  }

  openCalculator() {
    const dialogRef = this.dialog.open(ProductCalculatorComponent, { height: '40%', width: '25%'});
    dialogRef.afterClosed().subscribe( calculatedProduct => {
      this.calculatedProduct = calculatedProduct
    })
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (data: { products: Array<Product> }) => {
        this.products = data.products
      }
    )
  }

  create(){
    const dialogRef = this.dialog.open(ProductFormComponent, { height: '50%', width: '25%', data: { action: 'Create', product: null}})
    dialogRef.afterClosed().subscribe( (productData: any) => {
      if(productData != null){
        this.productService.createProduct(productData).subscribe(
          () => { this.getProducts() }
        )
      }
    })
  }

  edit(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, { height: '50%', width: '25%', data: { action: 'Edit', product: product}})
    dialogRef.afterClosed().subscribe( (productData: any) => {
      if(productData != null){
        this.productService.updateProduct(product._id["$oid"], productData).subscribe(
          () => { this.getProducts() }
        )
      }
    })
  }

  delete(product: Product){
    this.productService.deleteProduct(product._id['$oid']).subscribe(
      () => { this.getProducts() }
    )
  }

}
