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

  private async onSubmitButtonClick() {
    await this.dbService.updateObjectAtPath(`launch/emails/${this.email}`, true);
    this.email = '';
  }

}
