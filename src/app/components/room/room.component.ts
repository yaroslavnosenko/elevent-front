import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  @ViewChild('people') people: ElementRef;
  @ViewChild('chat') chat: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  openPeople() {
    this.renderer.removeClass(this.people.nativeElement, 'el_moved__left');
    this.renderer.addClass(this.people.nativeElement, 'el_moved__center');
  }

  openChat() {
    this.renderer.removeClass(this.people.nativeElement, 'el_moved__center');
    this.renderer.addClass(this.people.nativeElement, 'el_moved__left');
  }
}
