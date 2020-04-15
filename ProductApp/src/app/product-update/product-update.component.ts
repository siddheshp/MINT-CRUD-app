import { ProductApiService } from './../services/product-api.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  productForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: ProductApiService,
    private datePipe: DatePipe,
    private router: Router) { }

  ngOnInit(): void {
    // 1. Create the form group
    this.productForm = this.formBuilder.group({
      Id: [null, Validators.required],
      Name: [null, Validators.required],
      Price: [null, Validators.required],
      CreatedDate: [null, Validators.required],
      Category: [null, Validators.required]
    });

    // 2. get product id from route param
    let productId = this.route.snapshot.params['id'];
    console.log('Product id ' + productId);

    // 3. get product details from service and bind to form
    this.service.getProduct(productId).subscribe(product => {
      console.log(product);

      this.productForm.setValue({
        Id: product.Id,
        Name: product.Name,
        Price: product.Price,
        CreatedDate: this.datePipe.transform(product.CreatedDate, 'yyyy-MM-dd'),
        Category: product.Category
      });
    }, err => {
      console.log(err);
    });
  }

  onSubmit(form: NgForm) {
    //call service Update method
    this.service.updateProduct(form as unknown as Product).subscribe(result=>{
      alert('update successful');
      //navigate to product list
      this.router.navigate(['/productlist']);
    }, err=>{
      alert(err);
    });
  }
}
