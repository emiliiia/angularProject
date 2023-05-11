import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pharmacy';

  name = 'Anna';
  userImage = 'assets/avatar.jpg';
  qaz: string = '';

  constructor() {}

data = [
  {
    id: 1,
    name: 'Drug 1',
    price: 233,
    hide: false,
    type: 1
  },
  {
    id: 2,
    name: 'Drug 2',
    price: 321,
    hide: true,
    type: 1
  },
  {
    id: 3,
    name: 'Drug 3',
    price: 325,
    hide: false,
    type: 1
  },
  {
    id: 4,
    name: 'Drug 4',
    price: 345,
    hide: true,
    type: 1
  },
  {
    id: 5,
    name: 'Drug 5',
    price: 531,
    hide: false,
    type: 2
  },
  {
    id: 6,
    name: 'Drug 6',
    price: 345,
    hide: true,
    type: 2
  },
  {
    id: 7,
    name: 'Drug 7',
    price: 614,
    hide: false,
    type: 2
  },
  {
    id: 8,
    name: 'Drug 8',
    price: 345,
    hide: true,
    type: 2
  }
]

  menuNav = [
    {
      label: 'Home',
      photoPath: 'assets/siteStyle/iconHome2.png',
      src: '/home',
    },
    {
      label: 'Products',
      photoPath: 'assets/siteStyle/iconAqua.png',
      src: '/products',
    },
    {
      label: 'About',
      photoPath: 'assets/siteStyle/logo.png',
      src: '/about',
    }
  ]
}


