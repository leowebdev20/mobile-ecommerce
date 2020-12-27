import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, ModalController, ToastController } from '@ionic/angular';
import { SortModalComponent } from '../components/sort-modal/sort-modal.component';
import { CategoryModel } from '../models/categoryModel';
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
  filterCount = 0;
  filteredCategoryList: any[] = [];
  categories: CategoryModel[] = [];

  constructor(private productService: ProductService,
              private loadingController: LoadingController,
              private menuController: MenuController,
              private toastController: ToastController,
              private modalController: ModalController) {}

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
      console.log(err);
    });

    this.categories = await this.productService.getAllCategories().toPromise();
  }

  loadingSpinner() {
    this.loadingController.create({
      message: 'Loading details...',
      spinner: 'lines',
      animated: true,
      backdropDismiss: false,
      showBackdrop: true
    }).then(el => el.present());
  }

  openModal() {
    this.modalController.create({
      component: SortModalComponent,
      animated: true,
      cssClass: 'sortModal'
    }).then(el => {
      el.present().then();
      return el.onDidDismiss().then(resultData => {
        this.sort({role: resultData.role, data: resultData.data});
      })
    });
  }

  sort(resultData: {role:string, data: string}) {
    const {role, data} = {...resultData};
    if (role == 'cancel') {
      return;
    } 
    
    else if (role == 'sort') {

      if (data == 'title-asc') {
        this.displayedList.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();

          if (x < y) {
            return -1;
          }
          
          if (x > y) {
            return 1;
          }
          return 0;
        });
      }

      else if (data == 'title-desc') {
        this.displayedList.sort((a, b) => {
          const x = a.name.toLowerCase();
          const y = b.name.toLowerCase();

          if (x > y) {
            return -1;
          }
          
          if (x < y) {
            return 1;
          }
          return 0;
        });
      }

      else if (data == 'price-asc') {
        this.displayedList.sort((a, b) => {
          // @ts-ignore
          return a.price - b.price;
        })
      }

      else if (data == 'price-desc') {
        this.displayedList.sort((a, b) => {
          // @ts-ignore
          return b.price - a.price;
        })
      }
    }
  }

  openFilter() {
    this.menuController.enable(true, 'filter').then();
    this.menuController.open('filter').then();
  }

  categoryFilter(e: {name: string, selected: boolean}) {

    if (e.selected && this.filterCount == 0) {
      this.filteredCategoryList.push(e.name);
      this.filterCount++;
      this.displayedList = this.displayedList.filter(p => p.categories.some(cat => cat.name == e.name));
    }
    else if (e.selected && this.filterCount >= 1) {
      const newArray = [...this.listArrayOfProducts];
      this.filterCount++;

      if (!this.filteredCategoryList.includes(e.name)) {
        this.filteredCategoryList.push(e.name);

        const product: ProductModel[] = newArray.filter(p => p.categories.some(cat => cat.name == e.name));
        let i;

        product.forEach(p => {
          i = this.displayedList.findIndex(prod => prod.id == p.id);

          if (i !== -1) {
            return;
          } else {
            this.displayedList = this.displayedList.concat(p);
          }
        })
      } else {
        return;
      }
    }

    else if (!e.selected && this.filterCount >= 0) {
      const newArray = [...this.listArrayOfProducts];
      this.filterCount--;

      this.filteredCategoryList = this.filteredCategoryList.filter(e => e !== e.name)
      if (this.filteredCategoryList.length > 0) {
        this.displayedList = [];
        this.filteredCategoryList.forEach(e => {
          this.displayedList = this.displayedList.concat(
            newArray.filter(p => p.categories.some(cat => cat.name == e))
          );
        })
      }

      if (this.filterCount == 0) {
        this.displayedList = [...this.listArrayOfProducts];
      }
    }
  }

}
