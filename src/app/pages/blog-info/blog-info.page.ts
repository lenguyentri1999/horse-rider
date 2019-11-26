import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Blog } from 'src/models/blog';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { BlogService } from 'src/app/services/blog.service';
import { UserData } from 'src/models/userData';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-blog-info',
  templateUrl: './blog-info.page.html',
  styleUrls: ['./blog-info.page.scss'],
})
export class BlogInfoPage implements OnInit {
  blog$: Observable<Blog>;
  userData$: Observable<UserData>;

  constructor(
    protected route: ActivatedRoute,
    protected blogService: BlogService,
    protected userProfileService: UserProfileService,
  ) {

    this.blog$ = this.route.paramMap.pipe(
      switchMap(params => this.blogService.getByID(params.get('id')))
    );

    this.userData$ = this.blog$.pipe(
      switchMap(blog => this.userProfileService.getUserProfile(blog.uid))
    );

  }

  ngOnInit() {
  }

}
