import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../../services/event.service';
import {Subscription} from 'rxjs';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  mainForm: FormGroup;

  private subs: Subscription[] = [];

  constructor(private  fb: FormBuilder,
              private router: Router,
              private _user: UserService,
              private _event: EventService) {
    this.mainForm = fb.group({
      hash: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  find() {
    if (this.mainForm.valid) {
      this.subs.push(
        this._event.findEventByHash(this.mainForm.controls.hash.value).subscribe(
          (data: any) => {
            this.subs.push(
              this._event.addUserToEvent(this._user.getID(), data.id).subscribe(
                (addedToEvent) => {
                  console.log(addedToEvent);
                  this.router.navigate(['']);
                }, err => {
                  console.log(err);
                }
              )
            );
          }, err => {
            console.log(err);
          }
        )
      );
    }
  }
}
