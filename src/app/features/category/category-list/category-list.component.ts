import {Observable} from 'rxjs';
import {Category} from '../models/category.model';
import {CategoryService} from './../services/category.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories$?: Observable<Category[]>;
  list: number[] = [];
  totalCount?: number;
  pageNumber = 1;
  pageSize = 3;

  constructor(private categoryService: CategoryService) {
  }


  ngOnInit(): void {
    this.categoryService.getCategoryCount()
      .subscribe({
        next: (value) => {
          this.totalCount = value;
          this.list = new Array(Math.ceil(value / this.pageSize));
          this.categories$ = this.categoryService.getAllCategories(
            undefined,
            undefined,
            undefined,
            this.pageNumber,
            this.pageSize
          );
        }
      })

  }

  onSearch(query: string) {
    this.categories$ = this.categoryService.getAllCategories(query);
  }

  sort(sortBy: string, sortDirection: string) {
    this.categories$ = this.categoryService.getAllCategories(undefined, sortBy, sortDirection);
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;

    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getNextpage() {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }
    this.pageNumber += 1
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getPrevpage() {
    if (this.pageNumber - 1 < 1) {
      return;
    }
    this.pageNumber -= 1
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }
}
