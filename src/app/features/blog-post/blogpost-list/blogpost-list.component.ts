import { Observable } from 'rxjs';
import { BlogPostService } from './../services/blog-post.service';
import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit{

  blogPosts$?: Observable<BlogPost[]> | undefined;

  constructor(private blogPostService: BlogPostService){

  }

  
  ngOnInit(): void {
   // Get all blog posts from API
    this.GetAllBlogpost();
  }

  GetAllBlogpost(){
  this.blogPosts$ =   this.blogPostService.getAllBlogPosts();
  }

}
