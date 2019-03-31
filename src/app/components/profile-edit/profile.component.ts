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

  userid: number = 0;

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
    if (this.profileForm.controls.skill.value.length > 0) {
      this.chips.push(this.profileForm.controls.skill.value);
      this.profileForm.controls.skill.reset();
    }
  }

  removeChip(name) {
    this.chips = this.chips.filter(c => c !== name);
  }

  save() {

  }
}
