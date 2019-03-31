import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {FacebookService} from '../../services/facebook.service';

declare var firebase;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(private router: Router,
              private _fb: FacebookService,
              private _user: UserService) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  doLogIn() {
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
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
        const token = result.credential.accessToken;
        const fbUID = result.user.providerData[0].uid;
        this._fb.getUserLink(fbUID, token).subscribe(
          data => {
            console.log({fbcb: data});
          }, err => {
            console.log(err);
          }
        );
        const user = result.user;
        console.log(user);
        this.subs.push(
          this._user.login({
            profile_url: 'facebook.com',
            uid: user.uid,
            photo_url: user.photoURL,
            display_name: user.displayName,
            email: user.email
          }).subscribe(
            (data: any) => {
              console.log(data);
              this._user.setToken(data.token);
              if (data.isNew === true) {
                this.router.navigate(['', 'profile']);
              } else {
                this.router.navigate(['']);
              }
            }, err => {
              console.log(err);
            }
          )
        );
      })
      .catch(error => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
  }
}
