import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.page.html',
  styleUrls: ['./launch.page.scss'],
})
export class LaunchPage implements OnInit {
  email = '';

  constructor(
    protected dbService: DbService,
  ) { }

  ngOnInit() {
  }

  public async onSubmitButtonClick() {
    await this.dbService.pushObjectAtPath(`launch/emails/`, {email: this.email});
    this.email = '';
  }

}
