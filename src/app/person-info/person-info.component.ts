import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-person-info',
  templateUrl: './person-info.component.html',
  styleUrls: ['./person-info.component.css']
})
export class PersonInfoComponent implements OnInit {
  users!: any[];
  user!: any;
  id!: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.queryParamMap.get('id');
    this.id = Number(id);

    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.user = JSON.parse(userJson);
    }

  }
}
