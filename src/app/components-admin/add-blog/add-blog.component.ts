import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';
import { Blog } from 'src/models/blog';
import { DbService } from 'src/app/services/db.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.scss'],
})
export class AddBlogComponent implements OnInit {
  readonly myForm: FormGroup;

  constructor(
    protected fb: FormBuilder,
    protected modalCtrl: ModalController,
    protected blogService: BlogService,
    protected db: DbService,
    protected authService: AuthService,
    protected router: Router,
  ) {
    this.myForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      pictureUrl: ['', Validators.required]
    });
  }

  ngOnInit() { }

  submit() {
    this.authService.tryGetUserId().subscribe(uid => {

      const blog: Blog = {
        id: this.db.uuidv4(),
        dateTime: new Date(),
        uid,
        title: this.myForm.get('title').value,
        description: this.myForm.get('description').value,
        pictureUrl: this.myForm.get('pictureUrl').value,
      };

      this.blogService.tryAddNew(blog);

      this.onCloseButton();
    });
  }

  onCloseButton() {
    this.modalCtrl.dismiss();
    // TODO: navigate back
  }

}
