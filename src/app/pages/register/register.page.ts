import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/user';
import { AuthService } from '../../services/auth.service';
import { ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    protected authService: AuthService,
    protected toastCtrl: ToastController,
    protected router: Router,
  ) { }

  ngOnInit() {
  }

  async register(form: NgForm) {
    if (form.value.password !== form.value.confirm) {
      return;
    }

    const user: User = {
      email: form.value.email,
      password: form.value.password,
      name: form.value.name
    };

    try {
      const r = await this.authService.register(user);
      if (r) {
        const toast = await this.toastCtrl.create({
          message: 'Registration successful!',
          duration: 2000,
        });
        toast.present();
        this.router.navigate(['']);
      }
    } catch (err) {
        const toast = await this.toastCtrl.create({
          message: err.message,
          duration: 2000,
        });
        toast.present();
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
