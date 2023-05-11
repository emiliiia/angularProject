import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {FormUser} from "../../interface/form-user";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private savedUsers: FormUser[] = [];

  constructor() {
    const storedObjects = localStorage.getItem('savedUsers');
    if (storedObjects) {
      this.savedUsers = JSON.parse(storedObjects);
    }
  }

  getSavedUsers(): Observable<FormUser[]> {
    return of(this.savedUsers);
  }

  saveUser(user: FormUser): Observable<boolean> {
    let saved = false;
    let index = -1;
    for(let i = 0; i < this.savedUsers.length; i++){
      if(this.savedUsers[i].id === user.id){
        index = i;
        break;
      }
    }
    if(index === -1){
      user.id = Date.now();
      this.savedUsers.push(user);
      saved = true;
    }
    else {
      this.savedUsers[index] = user;
      saved = true;
    }
    localStorage.setItem('savedUsers', JSON.stringify(this.savedUsers));
    return of(saved);
  }

  getUserById(id: number): Observable<FormUser | undefined> {
    const user = this.savedUsers.find(u => u.id === id);
    return of(user);
  }

  updateUser(user: FormUser): Observable<boolean> {
    let updated = false;
    const index = this.savedUsers.findIndex(u => u.id === user.id);
    if (index > -1) {
      this.savedUsers[index] = user;
      updated = true;
      localStorage.setItem('savedUsers', JSON.stringify(this.savedUsers));
    }
    return of(updated);
  }

  deleteUser(id: number): Observable<boolean> {
    let deleted = false;
    for (let i = 0; i < this.savedUsers.length; i++) {
      if (this.savedUsers[i].id === id) {
        this.savedUsers.splice(i, 1);
        deleted = true;
        break;
      }
    }
    localStorage.setItem('savedUsers', JSON.stringify(this.savedUsers));
    return of(deleted);
  }
}
