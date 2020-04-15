import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path : 'productlist',
    component : ProductListComponent,
    data : { title: 'List of products'}
  },
  {
    path : 'create',
    component : ProductAddComponent,
    data : { title: 'Create new product'}
  },
  {
    path : 'update/:id',
    component : ProductUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
