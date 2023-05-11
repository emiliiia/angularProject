import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-fotter',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() post: { label: string; photoPath: string; active: boolean; } | undefined;
  @Input() menuNav!: { label: string; photoPath: string; src: string; }[];
  @Output() event = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
}
