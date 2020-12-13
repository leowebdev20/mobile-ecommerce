import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  filteredProducts: ProductModel[] = [];
  showSkeleton: boolean;
  touched: boolean;

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  search(e: any) {
     this.touched = false;
     this.filteredProducts = [];
     this.showSkeleton= true;
     this.productService.searchProducts(e.target.value).subscribe((prods: ProductModel[]) => {
        if (prods.length <= 0) {
          this.touched = true;
        } else {
          this.touched = false;
        }

        this.showSkeleton = false;
        this.filteredProducts = prods;
     }, err => console.log(err));
  }

}
