import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Observable } from 'rxjs';
import { Blog } from 'src/models/blog';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrls: ['./admin-blog.component.scss'],
})
export class AdminBlogComponent implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  blogs$: Observable<Blog[]>;

  p = 1;

  constructor(
    protected blogService: BlogService,
    protected router: Router,
  ) {
    this.blogs$ = this.blogService.getAllAsList();
  }

  ngOnInit() { }

  onPageChange(page: number) {
    this.p = page;
    if (this.content) {
      this.content.scrollToTop();
    }
  }

  onAddBlogButton() {
    this.router.navigate(['/admin/blog-add']);
  }

}
