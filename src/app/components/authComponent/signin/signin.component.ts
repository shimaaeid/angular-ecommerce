import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  error: string = '';
  isLoading: boolean = false;

  constructor(private _auth: AuthService, private _router: Router) { }

  loginForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{4,8}$/)]),

  });

  loginSubmit(form: FormGroup) {
    this.isLoading = true;
    if (this.loginForm.valid) {
      this._auth.login(form.value).subscribe({
        next: (response) => {
          console.log(response)
          if (response.message == 'success') {
            localStorage.setItem('userToken', response.token);
            this._auth.saveUserDate();
            this._router.navigate(['/home'])

          }
          this.isLoading = false;
        },
        error: (error) => {
          console.log(error)
          this.error = error.error.message;
          this.isLoading = false;

        }
      })


    }
  }



  }
