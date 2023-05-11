import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FormControl} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {Sort} from '@angular/material/sort';

interface Medicine {
  id: number;
  name: string;
  dosage: number;
  manufacturer: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.sortedData = this.medicine.slice();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  users = [
    {
      id: 1,
      name: 'Anna',
      lastname: 'Okorokova',
      dateOfBirth: new Date("3/2/2002"),
      salary: 100000,
      workingHours: 143256789
    },
    {
      id: 2,
      name: 'Victor',
      lastname: 'Velichko',
      dateOfBirth: new Date("2/1/1990"),
      salary: 50000,
      workingHours: 123456789
    },
    {
      id: 3,
      name: 'Artem',
      lastname: 'Labyak',
      dateOfBirth: new Date("1/2/2000"),
      salary: 40000,
      workingHours: 22589
    },
    {
      id: 4,
      name: 'Maria',
      lastname: 'Gavrylo',
      dateOfBirth: new Date("12/3/1993"),
      salary: 200,
      workingHours: 127439
    },
    {
      id: 5,
      name: 'Kate',
      lastname: 'Doe',
      dateOfBirth: new Date("6/6/1980"),
      salary: 88000,
      workingHours: 12345
    }
  ]

  goToPersonInfoPage(id: number) {
    this.router.navigate(['/personInfo'], {
      queryParams: { id: id }
    });

    localStorage.setItem('user', JSON.stringify(this.users.find(u => u.id === id)));
  }

  ngOnInit(): void {
  }

  /*******************************************************/
  keywords = ['awesome', 'cool'];
  formControl = new FormControl(['professionally']);

  removeKeyword(keyword: string) {
    const index = this.keywords.indexOf(keyword);
    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.keywords.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  /*******************************************************/
  medicine: Medicine[] = [
    { id: 1, name: 'Paracetamol', dosage: 500, manufacturer: 'Johnson & Johnson', price: 5.99, quantity: 100 },
    { id: 2, name: 'Ibuprofen', dosage: 400, manufacturer: 'Pfizer', price: 8.99, quantity: 50 },
    { id: 3, name: 'Aspirin', dosage: 325, manufacturer: 'Bayer', price: 4.99, quantity: 200 },
    { id: 4, name: 'Amoxicillin', dosage: 875, manufacturer: 'GlaxoSmithKline', price: 12.99, quantity: 30 },
    { id: 5, name: 'Lisinopril', dosage: 10, manufacturer: 'Merck', price: 7.99, quantity: 75 },
    { id: 6, name: 'Metformin', dosage: 500, manufacturer: 'Novartis', price: 9.99, quantity: 100 },
    { id: 7, name: 'Atorvastatin', dosage: 20, manufacturer: 'AstraZeneca', price: 15.99, quantity: 25 },
    { id: 8, name: 'Levothyroxine', dosage: 100, manufacturer: 'AbbVie', price: 11.99, quantity: 50 },
    { id: 9, name: 'Omeprazole', dosage: 20, manufacturer: 'Sanofi', price: 6.99, quantity: 150 },
    { id: 10, name: 'Albuterol', dosage: 90, manufacturer: 'Mylan', price: 19.99, quantity: 10 },
  ];

  sortedData!: Medicine[];


  sortData(sort: Sort) {
    const data = this.medicine.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'dosage':
          return compare(a.dosage, b.dosage, isAsc);
        case 'manufacturer':
          return compare(a.manufacturer, b.manufacturer, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        case 'quantity':
          return compare(a.quantity, b.quantity, isAsc);
        default:
          return 0;
      }
    });
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


@Component({
  selector: 'dialog-window',
  templateUrl: 'dialog-window.html',
})
export class DialogContentExampleDialog {}
