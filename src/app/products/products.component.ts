import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  qaz: string = '';
  bool: boolean | undefined;
  longText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
              molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
              numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
              optio, eaque rerum! Provident similique accusantium nemo autem.`;

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

  boolChange(){
    this.bool = !this.bool;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
