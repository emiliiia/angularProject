import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-left-nav-bar',
  templateUrl: './left-nav-bar.component.html',
  styleUrls: ['./left-nav-bar.component.css']
})
export class LeftNavBarComponent implements OnInit {

  @Input() post: { label: string; photoPath: string; active: boolean; } | undefined;
  @Input() menuNav!: { label: string; photoPath: string; src: string;}[];
  @Output() event = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
