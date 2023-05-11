import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() fio: string = '';
  @Output() event = new EventEmitter<string>();

  onEvent() {
    this.event.emit('Hello World')
  }

  constructor() {
  }

  ngOnInit(): void {
    //this.onEvent();
  }

}
