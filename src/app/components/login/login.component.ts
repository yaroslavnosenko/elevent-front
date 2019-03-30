import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

declare var firebase;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) {
    const config = {
      apiKey: 'AIzaSyBt3SwFxGbuJ8UQFsUtxFmqrPf11Kj2RnY',
      authDomain: 'elevent-e4e72.firebaseapp.com',
      databaseURL: 'https://elevent-e4e72.firebaseio.com',
      projectId: 'elevent-e4e72',
      storageBucket: 'elevent-e4e72.appspot.com',
      messagingSenderId: '703288633160'
    };
    firebase.initializeApp(config);
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }

  ngOnInit() {
  }

  doLogIn() {
    this.router.navigate(['', 'profile']);
  }

}
