import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

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

  private subs: Subscription[] = [];

  constructor(private renderer: Renderer2,
              private route: ActivatedRoute,
              private _event: EventService) {
  }

  ngOnInit() {
    this.subs.push(
      this.route.params.subscribe(
        (param: any) => {
          this.eventId = param.id;
          this.subs.push(
            this._event.findById(this.eventId).subscribe(
              (event: any) => {
                this.event = event;
                console.log(event);
              }, err => {
                console.log(err);
              }
            )
          );
          this.subs.push(
            this._event.getEventparticipants(this.eventId).subscribe(
              (users: any) => {
                console.log(users);
                this.participants = users;
              }
            )
          );
          this.subs.push(
            this._event.getEventStuff(this.eventId).subscribe(
              (users: any) => {
                console.log(users);
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

  showMessages() {
    this.renderer.removeClass(this.messages.nativeElement, 'hidden');
  }

  hideMessages() {
    this.renderer.addClass(this.messages.nativeElement, 'hidden');
  }
}
