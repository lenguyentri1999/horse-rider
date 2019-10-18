import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    protected authService: AuthService,
  ) { }

  ngOnInit() {
  }

  login(form) {
    const userInfo: User = {
      email: form.value.email,
      password: form.value.password
    };
    const r = this.authService.login(userInfo);
    if (r) {
      alert('Login success');
      return;
    }
    alert('Login failed');
  }

}
