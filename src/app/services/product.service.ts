import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryModel } from '../models/categoryModel';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.backend_api_url;

  constructor(private httpClient: HttpClient) { }

  getAllProducts(pageNumber: number = 1): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${this.url}/products?page=${pageNumber}&per_page=10`);
  }

  getSingleProduct(id: number): Observable<ProductModel> {
    return this.httpClient.get<ProductModel>(`${this.url}/products/${id}`);
  }

  searchProducts(keyword: string): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(`${this.url}/products?search=${keyword}`);
  }

  getAllCategories(): Observable<CategoryModel[]> {
    return this.httpClient.get<CategoryModel[]>(`${this.url}/products/categories?per_page=100&hide_empty=true&parent=0`);
  }

}
