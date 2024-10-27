import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  RegisterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.RegisterForm = this.fb.group({
      nameUserForm: ['', Validators.required],
      passwordForm: ['', [Validators.required, Validators.minLength(4)]],
      passwordFormRepeat: ['']
    }, { validator: this.checkPassword });
  }


  ngOnInit(): void {
  }

  Register(): void {
    console.log(this.RegisterForm);

    //Construimos Usuario
    const user: User = {
      nameUser: this.RegisterForm.value.nameUserForm,
      password: this.RegisterForm.value.passwordForm,
    }
    console.log(user)
  }


  checkPassword(group: FormGroup): any {
    const pass = group.controls['passwordForm'].value;
    const confirmPassword = group.controls['passwordFormRepeat'].value;
    return pass === confirmPassword ? null : { notSame: true }
  }

}
