import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    protected authService: AuthService
  ) { }

  ngOnInit() {
  }

  register(form: NgForm) {
    if (form.value.password !== form.value.confirm) {
      return;
    }

    const user: User = {
      email: form.value.email,
      password: form.value.password,
      name: form.value.name
    };

    const r = this.authService.register(user);
    if (r) {
      alert('Success');
      return;
    }
    alert('Nah brah');
  }

}
