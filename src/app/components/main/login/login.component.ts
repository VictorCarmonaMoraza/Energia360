import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      nameUserForm: ['', Validators.required],
      passwordForm: ['', Validators.required]
    })
  }


  ngOnInit(): void {
    //Obtener todos los usuarios
    this.getUserBD()


  }

  loggin(): void {
    console.log(this.loginForm);

    //Construimos Usuario
    const user: User = {
      nameUser: this.loginForm.value.nameUserForm,
      password: this.loginForm.value.passwordForm
    }
    console.log(user)
  }

  getUserBD() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        // Aquí se maneja la respuesta exitosa
        console.log('Response:', response);
        // Puedes asignar la respuesta a una variable o procesarla como necesites
      },
      error: (err) => {
        // Aquí se maneja cualquier error que ocurra en la llamada
        console.error('Error occurred:', err);
      },
      complete: () => {
        // Este bloque opcional se ejecuta cuando el observable termina (si aplica)
        console.log('Request completed');
      }
    })

  }
}
