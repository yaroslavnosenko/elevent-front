import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private profileForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder) {
    this.profileForm = fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      summary: ['', Validators.required],
      bio: ['', Validators.required],
      insta: ['', Validators.required],
      skills: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
}
