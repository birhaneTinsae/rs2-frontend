import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoginResponse } from 'src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: NzMessageService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }


  onLogin() {
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(res => {
      this.authService.setSession((res as LoginResponse).token);
      this.router.navigate(['/']);
    },
      error => {
        this.isLoading = false;
        this.messageService.error(error.error.apierror.debugMessage)
      })
  }
}