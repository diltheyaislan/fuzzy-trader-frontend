import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../../../core/services/users.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public processing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.buildForm();
  }

  submitForm() {
    if (this.form.valid) {
      this.processing = true;

      this.usersService.store(
        this.form.value.name,
        this.form.value.email,
        this.form.value.password)
        .subscribe(
          success => this.handleSuccess(success),
          error => this.handleError(error)
        )
    }
  }

  private handleSuccess(response) {
    this.notificationService.notify('Registration successful');
    this.router.navigate(['/']);
  }

  private handleError(response) {
    this.processing = false;
    let msg = response.error.message;
    this.notificationService.notify(`An error has occurred: ${msg}`);
  }

  private buildForm(){
    this.form = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    });
  }
}
