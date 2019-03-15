import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  friends: User[];
  constructor(private angularFireDataBase: AngularFireDatabase) {
   
  }

  getUsers(){
    return this.angularFireDataBase.list('/users');
  }

  getUserById(uid){
    return this.angularFireDataBase.object('/users/'+uid)
  }

  createUser(user) {
    return this.angularFireDataBase.object('/users/'+ user.uid).set(user);
  }

  editUser(user) {
    return this.angularFireDataBase.object('/users/'+ user.uid).set(user);
  }


}
