import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';
import {SkillService} from '../../services/skill.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit, OnDestroy {

  user: any;
  skills = [];

  private subs: Subscription[] = [];

  constructor(private _user: UserService,
              private _skill: SkillService) {
  }

  ngOnInit() {
    this.subs.push(
      this._user.getUser().subscribe(
        data => {
          this.user = data;
          console.log(data);
          this._skill.getuserSkills(this.user.id).subscribe(
            (skill: any) => {
              this.skills = skill;
              console.log(skill);
            }
          );
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}
