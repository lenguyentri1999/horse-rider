import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    protected authService: AuthService,
    protected toastCtrl: ToastController,
    protected router: Router,
  ) { }

  ngOnInit() {
  }

  async login(form) {
    const userInfo: User = {
      email: form.value.email,
      password: form.value.password
    };
    try {
      const r = await this.authService.login(userInfo);
      if (r) {
        const toast = await this.toastCtrl.create({
          message: 'Login successful!',
          duration: 2000,
        });
        toast.present();
        this.router.navigate(['']);
      }
    } catch (err) {
      this.showErrorAlert(err);
    }
  }

  async googleLogin() {
    try {
      await this.authService.googleLogin();
      this.router.navigate(['']);
    } catch (err) {
      this.showErrorAlert(err);
    }
  }

  async facebookLogin() {
    try {
      await this.authService.facebookLogin();
      this.router.navigate(['']);
    } catch (err) {
      this.showErrorAlert(err);
    }
  }

  private async showErrorAlert(err: Error) {
      const toast = await this.toastCtrl.create({
        message: err.message,
        duration: 2000,
      });
      toast.present();
  }

}
