import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-calculator',
  templateUrl: './product-calculator.component.html',
  styleUrls: ['./product-calculator.component.css']
})
export class ProductCalculatorComponent implements OnInit {

  constructor(private productService: ProductsService, public dialogRef: MatDialogRef<ProductCalculatorComponent>) { }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
  }

  calculatorForm = new FormGroup({
    length: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])),
    width: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])),
    height: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])),
    weight: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')]))
  })

  name: string = ''
  product: any = null


  calculate(){
    if(this.calculatorForm.valid){
      let params = this.calculatorForm.value
      this.productService.getCalculatedProduct(params).subscribe(
        (data) => {
          this.name = data.product.name + ' - ' +  data.product.type
          this.product = data.product;
          setTimeout( () => { this.dialogRef.close(data.product) }, 5000)
        }
      )
    }
  }

  close() {
    this.dialogRef.close(this.product)
  }

}
