import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  searchForm!: FormGroup;
  productForm!: FormGroup;
  pageIndex = 0;
  pageSize = 20;
  loading = true;
  products!: Product[];
  totalProductss = 0;
  registerDrawerVisible = false;
  isProductsEditVisible = false;
  productsId!: number;
  total!: number;
  isCollapse = true;

  selectedProducts: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: NzMessageService,

    private notificationService: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      productName: [],
      productType: []
    });
    this.productForm = this.fb.group({

    });
    this.getProducts(this.pageIndex, this.pageSize, undefined, undefined, []);
  }

  get product() {
    return this.productForm.value
  }

  get searchQuery() {
    return this.searchForm.value
  }


  getProducts(pageIndex: number,
    pageSize: number,
    sortField: string | undefined,
    sortOrder: string | undefined,
    filter: Array<{ key: string; value: string[] }>) {

    this.productService.getProducts(pageIndex, pageSize, sortField, sortOrder, '', filter)
      .subscribe(data => {
        console.log(data)
        this.loading = false;
        this.total = data.page.totalPages
        this.products = data._embedded.productDTOList
      });

  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || undefined;
    const sortOrder = (currentSort && currentSort.value) || undefined;
    this.getProducts(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  createProducts() {
    this.productService.createProduct(this.product)
      .subscribe(data => {

      })
  }

  deleteProducts(productsId: string) {
    this.productService.deleteProduct(productsId)
      .subscribe(data => {

      })
  }
  addToBasket(product: Product) {
    if (this.selectedProducts.length > 0 && this.selectedProducts.find(p => p.id == product.id)) {
      this.createNotification('error', 'Already exists', 'The selected product already exists in the basket')
    } else {
      this.selectedProducts.push(product);
    }
  }

  onDeleteFromBasket(productId: number) {
    this.selectedProducts = this.selectedProducts.filter(product => product.id !== productId)
  }

  toggleCollapse(): void {
    this.isCollapse = !this.isCollapse;
  }

  resetForm(): void {
    this.searchForm.reset();
  }

  search() {
    const { name, type } = this.searchQuery
    console.log(`${name} ${type}`);
    this.getProducts(this.pageIndex, this.pageSize, undefined, undefined, [this.searchQuery]);
  }

  buyProducts() {
    this.productService.buyProducts(this.selectedProducts)
      .subscribe(data => {
        this.createNotification('success', 'Bought successfully', 'Bought successfully');
        this.selectedProducts = []
      })
  }

  createNotification(type: string, title: string, message: string): void {
    this.notificationService.create(
      type,
      title,
      message
    );
  }

}
