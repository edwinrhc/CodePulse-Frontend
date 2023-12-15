import { BlogPostService } from './../services/blog-post.service';
import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogPost;
  errorMessage?: string;
  constructor(private blogPostService: BlogPostService,
              private router: Router){
    this.model = {
      
      title: 'test10',
      shortDescription: 'test2',
      urlHandle: 'angular-blogs',
      content: '#content',
      featuredImageUrl: 'image.jpg',
      author: 'edwin',
      publishedDate: new Date(),
      isVisible: true
    }
  }

 

  onFormSubmit():void{
   this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: (response) => {
          this.router.navigateByUrl('/admin/blogposts');
      },
      error: (error) => {
        
        if(error && error.error && error.error.errors){
          console.error('Detalle de validación', error.error.errors);
        }


        this.errorMessage = 'Error al agregar el blogpost, Por favor verifica los datos y vuelve a intentarlo.',
        console.error('Error: ', error);
      }
    })
  }
}
