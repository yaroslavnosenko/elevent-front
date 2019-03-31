import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {EventService} from '../../services/event.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {ChatService} from '../../services/char.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit, OnDestroy {

  @ViewChild('messages') messages: ElementRef;

  event: any;
  eventId: number;

  participants = [];
  stuff = [];

  messagesArray: any[] = [];
  messageForm: FormGroup;

  user: any;
  myId: number;

  private subs: Subscription[] = [];

  constructor(private renderer: Renderer2,
              private fb: FormBuilder,
              private chatService: ChatService,
              private route: ActivatedRoute,
              private router: Router,
              private _event: EventService,
              private _user: UserService) {
    this.messageForm = fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.myId = this._user.getID();
    this.subs.push(
      this.chatService
        .getMessages()
        .subscribe((message: any) => {
          console.log(message);
          this.messagesArray.push(message);
        })
    );

    this.subs.push(
      this._event.getAllMessages().subscribe(
        (messages: any) => {
          console.log(messages);
          this.messagesArray = messages;
        }, err => {
          console.log(err);
        }
      )
    );

    this.subs.push(
      this._user.getUser().subscribe(
        (user: any) => {
          this.user = user;
        }, err => {
          console.log(err);
        }
      )
    );

    this.subs.push(
      this.route.params.subscribe(
        (param: any) => {
          this.eventId = param.id;
          this.subs.push(
            this._event.findById(this.eventId).subscribe(
              (event: any) => {
                this.event = event;
              }, err => {
                console.log(err);
              }
            )
          );
          this.subs.push(
            this._event.getEventparticipants(this.eventId).subscribe(
              (users: any) => {
                this.participants = users;
              }
            )
          );
          this.subs.push(
            this._event.getEventStuff(this.eventId).subscribe(
              (users: any) => {
                this.stuff = users;
              }
            )
          );
        }
      )
    );
    this.hideMessages();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  goToUser(id) {
    this.router.navigate(['', 'person', id]);
  }

  sendMessage() {
    this.chatService.sendMessage({
      text: this.messageForm.controls.message.value,
      id: this._user.getID(),
      display_name: this.user.display_name,
      photo_url: this.user.photo_url
    });
    this.messageForm.controls.message.reset();
  }

  showMessages() {
    this.renderer.removeClass(this.messages.nativeElement, 'hidden');
  }

  hideMessages() {
    this.renderer.addClass(this.messages.nativeElement, 'hidden');
  }
}
