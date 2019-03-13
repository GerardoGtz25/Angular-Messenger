import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  friends: User[];
  constructor() {
    let usuario1: User = {
      nickname: 'Eduardo',
      subnick: 'El borrachote',
      age: 24,
      email: 'ed@aoe.aoe',
      friend: true,
      uid: 1
    }
    let usuario2: User = {
      nickname: 'Freddy',
      age: 28,
      email: 'fred@aoe.aoe',
      friend: true,
      uid: 2
    }
    let usuario3: User = {
      nickname: 'Yuliana',
      age: 18,
      email: 'yuli@aoe.aoe',
      friend: false,
      uid: 3
    }
    let usuario4: User = {
      nickname: 'Ricardo',
      age: 17,
      email: 'rick@aoe.aoe',
      friend: false,
      uid: 4
    }
    let usuario5: User = {
      nickname: 'Marcos',
      age: 30,
      email:'marcos@aoe.aoe',
      friend: true,
      uid: 5
    }
    this.friends = [usuario1,usuario2,usuario3,usuario4,usuario5];
  }

  getFriends() {
    return this.friends
  }
}