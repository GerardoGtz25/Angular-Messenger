import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

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

  constructor(private authenticationService: AuthenticationService, private userService: UserService, 
    private router: Router) {
    this.operation = 'login'
  }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password).then((data) => {
      this.router.navigate(['home'])
    }).catch((error) => {
      alert('Ocurrio un error')
    })
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password).then((data) => {
      
      const user = {
        uid: data.user.uid,
        email: this.email,
        nickName: this.nickName 
      }
      
      this.userService.createUser(user).then((response) => {
        alert('Registrado correctamente')
      }).catch((error) => {
        alert('Ocurrió un error')
        console.log(error)
      })
      
    }).catch((error) => {
      alert('Ocurrio un error')
      console.log(error)
    })
  }


}
