import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { ProductModel } from '../models/product-model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit  {
  sliderImages: any[] = [
    '/assets/slide1',
    '/assets/slide2',
    '/assets/slide3',
    '/assets/slide4',
    '/assets/slide5',
  ];
  sliderOptions = {
    autoplay: {
      delay: 800
    },
    loop: true
  }

  listArrayOfProducts: ProductModel[] = [];
  displayedList: ProductModel[] = [];      
  currentPage = 1;

  constructor(private productService: ProductService,
              private loadingController: LoadingController,
              private toastController: ToastController) {}

  async loadMoreData(e: any) {
    const toast = await this.toastController.create({
      message: 'No more products',
      animated: true,
      duration: 2000,
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });

    if (e == null) {
      this.currentPage = 1;
    } else {
      this.currentPage++;
      this.productService.getAllProducts(this.currentPage).subscribe(async (prods: ProductModel[]) => {
        this.listArrayOfProducts = this.listArrayOfProducts.concat(prods);
        this.displayedList = [...this.listArrayOfProducts];

        if (e !== null) {
          e.target.complete();
        }

        if (prods.length < 10) {
          await toast.present().then();
          e.target.disable = true;
        }
      }, (err) => console.log(err)
      );
    }
  }

  async ngOnInit() {
    const loader = await this.loadingController.create({
      message: 'Wait for products...',
      spinner: 'crescent',
      animated: true
    });

    await loader.present().then;
    this.productService.getAllProducts().subscribe(async (products: ProductModel[]) => {
      await loader.dismiss().then();
      this.listArrayOfProducts = products;
      this.displayedList = [...this.listArrayOfProducts];
    }, async (err) => {
      await loader.dismiss().then();
      console.error(err);
    })
  }

}
