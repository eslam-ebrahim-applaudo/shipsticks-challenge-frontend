import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductFormComponent>, @Inject(MAT_DIALOG_DATA) public data: {action: string, product: Product}) { }

  ngOnInit(): void {
    if(this.data.product != null){
      this.productForm.setValue({
        name: this.data.product.name,
        type: this.data.product.type,
        length: this.data.product.length.toString(),
        width: this.data.product.weight.toString(),
        height: this.data.product.height.toString(),
        weight: this.data.product.weight.toString()
      })
    }
  }

  productForm = new FormGroup({
    name: new FormControl('', Validators.compose([Validators.required])),
    type: new FormControl('', Validators.compose([Validators.required])),
    length: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])),
    width: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])),
    height: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])),
    weight: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')]))
  })


  submit() {
    if(this.productForm.valid){
      let formData: any = this.productForm.value as  Object
      formData.length = parseInt(formData.length, 10)
      formData.width = parseInt(formData.width, 10)
      formData.height = parseInt(formData.height, 10)
      formData.weight = parseInt(formData.weight, 10)
      this.dialogRef.close({product: formData});
    }
  }

  close() {
    this.dialogRef.close(null)
  }

}
