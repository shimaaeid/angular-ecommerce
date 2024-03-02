import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  msgSuccess:string = '';
  msgSu:string = '';
  constructor(private _auth:AuthService, private _router:Router){

  }

  forgotPassword = new FormGroup({
    email: new FormControl()
  });

  sendCode(form:FormGroup):void{
    console.log(form);
    this._auth.forgotPassword(form.value).subscribe({
      next:(response)=>{console.log(response);
         this.msgSuccess = response.message,
         document.querySelector('.forgotPassword')?.classList.add('d-none')
         document.querySelector('.verfiyCode')?.classList.remove('d-none')
      },
      error:(error)=>{console.log(error);
      }
    })

  }

  verifyCode = new FormGroup({
    resetCode: new FormControl()
  });

  verifyResetCode(form:FormGroup){
    this._auth.verifyCode(form.value).subscribe({
      next:(response)=>{console.log(response);
        this.msgSu = response.message;
        if(response.status == 'Success'){
          this._router.navigate(['/reset-password'])
        }

     },
     error:(error)=>{console.log(error);
     }

    })

  }

}
