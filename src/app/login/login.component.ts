import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  operation: string
  email: string = null
  password: string = null
  nickName: string = null

  constructor(private authenticationService: AuthenticationService) {
    this.operation = 'login'
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password).then((data) => {
      alert('Loggeado correctamente')
      console.log(data)
    }).catch((error) => {
      alert('Ocurrio un error')
      console.log(error)
    })
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password).then((data) => {
      alert('Loggeado correctamente')
      console.log(data)
    }).catch((error) => {
      alert('Ocurrio un error')
      console.log(error)
    })
  }


}
