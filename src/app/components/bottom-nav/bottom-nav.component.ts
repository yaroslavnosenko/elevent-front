import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {

  constructor(private router: Router, private _user: UserService) { }

  ngOnInit() {
  }

  goToMain() {
    this.router.navigate(['']);
  }

  goToProfile() {
    this.router.navigate(['', 'person', this._user.getID()]);
  }
}
