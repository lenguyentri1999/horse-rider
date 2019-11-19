import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Blog } from 'src/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.page.html',
  styleUrls: ['./blog.page.scss'],
})
export class BlogPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  p = 1;

  blogs$: Observable<Blog[]>;

  constructor(
    protected blogService: BlogService,
  ) {
    this.blogs$ = this.blogService.getAllAsList();
  }

  ngOnInit() {
  }

  onPageChange(page: number) {
    this.p = page;
    if (this.content) {
      this.content.scrollToTop();
    }
  }

}
