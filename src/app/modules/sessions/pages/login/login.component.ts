import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../../../core/services/auth.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  protected navigateTo: string;
  public processing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.buildForm();
    this.navigateTo = this.activatedRoute.snapshot.queryParamMap.get('to') || '/';

    if (this.authService.isLoggedIn()) {
      this.authService.logout();
    }
  }

  login() {
    if (this.form.valid) {
      this.processing = true;

      this.authService.login(
        this.form.value.email,
        this.form.value.password)
        .subscribe(
          success => this.handleSuccess(success),
          error => this.handleError(error)
        )
    }
  }

  private handleSuccess(response) {
    this.notificationService.notify(`Welcome, ${response.user.name.split(' ')[0]}`);
    this.router.navigate([this.navigateTo]);
  }

  private handleError(response) {
    this.processing = false;
    let msg = response.error.message;
    this.notificationService.notify(`An error has occurred: ${msg}`);
  }

  private buildForm(){
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }
}
