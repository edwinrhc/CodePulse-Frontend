import { BlogPostService } from './../services/blog-post.service';
import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit{
  model: AddBlogPost;
  errorMessage?: string;
  categories$?: Observable<Category[]>;


  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService) {
    this.model = {

      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      publishedDate: new Date(),
      isVisible: true,
      categories: []
    }
  }

  ngOnInit(): void {
    this.categories$ =  this.categoryService.getAllCategories();
  }



  onFormSubmit(): void {
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
        },
        error: (error) => {

          if (error && error.error && error.error.errors) {
            console.error('Detalle de validación', error.error.errors);
          }


          this.errorMessage = 'Error al agregar el blogpost, Por favor verifica los datos y vuelve a intentarlo.',
            console.error('Error: ', error);
        }
      })
  }
}
