import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductModel } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-prod-detail',
  templateUrl: './prod-detail.page.html',
  styleUrls: ['./prod-detail.page.scss'],
})
export class ProdDetailPage implements OnInit {
  product: ProductModel;
  showData:boolean = false;

  constructor(private route: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit() {
    this.route.data.subscribe((data: {product: ProductModel}) => {
      this.product = data.product;
      this.showData = true;
    })
  }

  addProduct(product: ProductModel) {
    this.cartService.addToCart(product);
  }

}
