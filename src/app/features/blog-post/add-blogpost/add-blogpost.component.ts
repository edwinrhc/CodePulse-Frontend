import { Component } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent {
  model: AddBlogPost;

  constructor(){
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      publishedDate: new Date(),
      isVisible: true
    }
  }

  onFormSubmit():void{
    console.log(this.model);
  }
}
