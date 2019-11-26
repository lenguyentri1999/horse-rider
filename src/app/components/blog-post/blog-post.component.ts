import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Blog } from 'src/models/blog';
import { Observable } from 'rxjs';
import { UserData } from 'src/models/userData';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.scss'],
})
export class BlogPostComponent implements OnInit, OnChanges {
  @Input() blog: Blog;

  userData$: Observable<UserData>;

  constructor(
    protected userProfileService: UserProfileService,
  ) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.blog) {
      this.blog = changes.blog.currentValue;
      this.userData$ = this.userProfileService.getUserProfile(this.blog.uid);
    }
  }


}
