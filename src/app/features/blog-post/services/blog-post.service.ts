import { Injectable } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { Observable, catchError } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }


  createBlogPost(data: AddBlogPost) : Observable<BlogPost>{

    return this.http.post<BlogPost>(`${environment.apiBaseUrl}/api/blogposts`,data)
      .pipe(
        catchError((error) => {
          //Manejar el erro aqui
          console.error('Error: ', error);
          throw error;
        })
      )

  }


}
