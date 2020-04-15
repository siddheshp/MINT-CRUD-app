import { Product } from './../models/product';
import { ProductApiService } from './../services/product-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  // inject service object
  constructor(private service: ProductApiService) { }

  ngOnInit(): void {
    // call service method to get product list
    this.getProducts();
  }

  getProducts(){
    this.service.getProductList().subscribe(productList => {
      this.products = productList;
    }, err => {
      console.log(err);
    });
  }

  deleteProduct(id: number) {
    if (confirm('You really want to delete?')) {
      console.log('Deleting product with id=' + id);
      //call service method 
      this.service.deleteProduct(id).subscribe(result => {
        alert('product deleted');
        this.getProducts();
      }, err => {
        alert('failed to delete product; ' + err);
      });  
    }
  }
}
