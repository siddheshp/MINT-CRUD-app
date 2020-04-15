import { DatePipe } from '@angular/common';
import { ProductApiService } from './../services/product-api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private service: ProductApiService,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    console.log(this.datePipe.transform(new Date(), 'yyyy-MM-dd'));

    this.productForm = this.formBuilder.group({
      Name: [null, [Validators.required, Validators.maxLength(50)]],
      Price: [null, Validators.required],
      CreatedDate: [this.datePipe.transform(new Date(), 'yyyy-MM-dd'), Validators.required],
      Category: [null, Validators.required]
    });
  }

  onSubmit(form: NgForm) {
    console.log(form);
    // create prouct model object and pass to service
    this.service.createProduct(form as unknown as Product).subscribe(res => {
      alert('Product added successfully');
      this.router.navigate(['/productlist']);
    }, err => {
      alert(err);
    });
  }
}
