import { Component, OnInit } from '@angular/core';
import { User } from './../interfaces/user'
import { UserService } from '../services/user.service'
import { AuthenticationService } from './../services/authentication.service' 
import { Router } from '@angular/router'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  friends: User[]
  query: string
  user: User
  friendEmail: any
  
  constructor(private userService: UserService, private authentificationService: AuthenticationService, private router: Router,
    private modalService: NgbModal, private requestsService: RequestsService) { 
    this.userService.getUsers().valueChanges().subscribe((data: User[]) => {
      this.friends = data;
    })
    this.authentificationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data
        
        if(this.user.friends){
          this.user.friends = Object.values(this.user.friends)
        }
       
        console.log(this.user)
      }, (error) => {
        console.log(error)
      })
    }, (error) => {
      console.log(error)
    })
  }

  ngOnInit() {
    
  }

  logout() {
    this.authentificationService.logOut().then(() => {
      this.router.navigate(['login'])
    }).catch((error) => {
      console.log(error)
    })
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  sendRequest(){
    const requests = {
      timestamp: Date.now(),
      receiver_email: this.friendEmail,
      sender: this.user.uid,
      status: 'pending'
    }
    this.requestsService.createRequest(requests).then(() => {
      alert('Solicitud enviada')
    }).catch((error) => {
      console.log(error)
    })
  }

}
