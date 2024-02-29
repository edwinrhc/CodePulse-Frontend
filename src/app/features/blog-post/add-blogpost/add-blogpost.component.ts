import { BlogPostService } from './../services/blog-post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/components/image-selector/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit, OnDestroy{
  model: AddBlogPost;
  errorMessage?: string;
  isImageSelectorVisible : boolean = false;
  categories$?: Observable<Category[]>;

  imageSelectorSubscription?: Subscription;


  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService) {
    this.model = {

      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }

  ngOnInit(): void {
    this.categories$ =  this.categoryService.getAllCategories();
    this.imageSelectorSubscription =this.imageService.onSelectImage()
      .subscribe({
        next: (selectdImage) => {
            this.model.featuredImageUrl = selectdImage.url;
            this.closeImageSelector();
        }
      })


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

  
  openImageSelector(): void{
    this.isImageSelectorVisible = true;
  }


  closeImageSelector():void{
    this.isImageSelectorVisible = false;
  }

  
  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }

}
