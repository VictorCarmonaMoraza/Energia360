import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      nameUserForm: ['', Validators.required],
      passwordForm: ['', Validators.required]
    })
  }

  loggin():void{
    console.log(this.loginForm);

    //Construimos Usuario
    const user: User={
      nameUser:this.loginForm.value.nameUserForm,
      password:this.loginForm.value.passwordForm
    }
    console.log(user)
  }
}
