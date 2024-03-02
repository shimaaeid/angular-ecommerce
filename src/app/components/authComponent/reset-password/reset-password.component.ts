import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  error: string = '';
  isLoading: boolean = false;

  constructor(private _auth: AuthService, private _router: Router) { }

  resetForm: FormGroup = new FormGroup({

    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{4,8}$/)]),

  });

  resetSubmit(form: FormGroup) {
    this.isLoading = true;
    if (this.resetForm.valid) {
      this._auth.resetPassword(form.value).subscribe({
        next: (response) => {
          console.log(response)


            this._router.navigate(['/signin'])

          
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
