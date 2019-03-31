import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  chips = [];

  profileForm: FormGroup;

  userid = 0;

  user: any;

  private subs: Subscription[] = [];

  constructor(private router: Router,
              private _user: UserService,
              private fb: FormBuilder) {
    this.profileForm = fb.group({
      display_name: ['', Validators.required],
      summary: ['', Validators.required],
      bio: ['', Validators.required],
      skill: ['']
    });
  }

  ngOnInit() {
    this.subs.push(
      this._user.getUser().subscribe(
        (user: any) => {
          this.user = user;
          console.log(user);
          this.profileForm.controls.bio.setValue(user.bio);
          this.profileForm.controls.summary.setValue(user.summary);
          this.profileForm.controls.display_name.setValue(user.display_name);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  addChip() {
    this.chips.push(this.profileForm.controls.skill.value);
    this.profileForm.controls.skill.reset();
  }

  removeChip(name) {
    this.chips = this.chips.filter(c => c !== name);
  }

  save() {
    this.subs.push(
      this._user.updateUser({
        profile_url: this.user.profile_url,
        uid: this.user.uid,
        photo_url: this.user.photo_url,
        display_name: this.profileForm.controls.display_name.value,
        email: this.user.email,
        summary: this.profileForm.controls.summary.value,
        bio: this.profileForm.controls.bio.value
      }).subscribe(
        updated => {
          this.router.navigate(['']);
        }, err => {
          console.log(err);
        }
      )
    );
  }
}
