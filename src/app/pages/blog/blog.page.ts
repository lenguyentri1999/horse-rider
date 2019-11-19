import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/models/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  blogs$: Observable<Blog[]>;

  constructor(
    protected blogService: BlogService,
  ) {
    this.blogs$ = this.blogService.getAllAsList();
  }

  ngOnInit() {
  }

}
