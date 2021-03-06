import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User
  imageChangedEvent: any = ''
  croppedImage: any = ''
  picture: any

  constructor(private userService: UserService, private authenticationService: AuthenticationService,
    private firebaseStorage: AngularFireStorage) {
    this.authenticationService.getStatus().subscribe((status) => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data
        console.log(this.user);
      }, (error) => {
        console.log(error)
      })
    }, (error) => {
      console.log(error)
    })
  }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
  }

  imageLoaded() {
      // show cropper
  }

  loadImageFailed() {
      // show message
  }

  saveSettings() {
    if(this.croppedImage){
      const currentPicturesId = Date.now()
      const pictures = this.firebaseStorage.ref('pictures/' + currentPicturesId + '.jpg').putString(this.croppedImage, 'data_url')
      pictures.then((result) => {
        this.picture = this.firebaseStorage.ref('pictures/' + currentPicturesId +'.jpg').getDownloadURL()
        this.picture.subscribe((picture) => {
          this.userService.setAvatar(picture, this.user.uid).then(() => {
            alert('Imagen subida correctamente')
          }).catch((error) => {
            alert('ocurrio un error')
            console.log(error)
          })
        })
      }).catch((error) => {
        alert('ocurrio un error')
        console.log(error)
      })
    }else{
      this.userService.editUser(this.user).then(() => {
        alert('Cambios guardados!')
      }).catch((error) => {
        alert('Ocurrio un error')
        console.log(error)
      })
    }
  }

}
