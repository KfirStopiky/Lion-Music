import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ShoppingService } from 'src/app/shared/shopping/shopping.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
})
export class AdminEditComponent implements OnInit, OnDestroy {
  editProductForm!: FormGroup;
  subscription!: Subscription;
  imagesForm!: FormGroup;
  first_image: string = '';
  second_image: string = '';
  third_image: string = '';
  foutrh_image: string = '';
  categoryName: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public _Data: any,
    public _FormBuilder: FormBuilder,
    public _ShoppingService: ShoppingService
  ) {}

  ngOnInit(): void {
    this._ShoppingService
      .getProductItem(this._Data.id)
      .subscribe((res: any) => {
        console.log(res);
        this.first_image = res.product_images[0];
        this.second_image = res.product_images[1];
        this.third_image = res.product_images[2];
        this.foutrh_image = res.product_images[3];
        this.editProductForm = this._FormBuilder.group({
          product_name: new FormControl(res.product_name, Validators.required),
          price: new FormControl(res.product_price, Validators.required),
          category: new FormControl('', Validators.required),
        });

        this.imagesForm = this._FormBuilder.group({
          first_image: new FormControl(
            this.first_image,
            Validators.required
          ),
          second_image: new FormControl(
           this.second_image,
            Validators.required
          ),
          third_image: new FormControl(
           this.third_image,
            Validators.required
          ),
          foutrh_image: new FormControl(
            this.foutrh_image,
            Validators.required
          ),
        });
      });
  }

  updateProductByAdminHandler() {
    this._ShoppingService.updateProductByAdmin(this._Data.id, {
      product_name: this.editProductForm.controls.product_name.value,
      product_price: this.editProductForm.controls.price.value,
      category: this.editProductForm.controls.category.value,
      product_images: [
        this.first_image,
        this.second_image,
        this.third_image,
        this.foutrh_image,
      ],
    });
  }
  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
