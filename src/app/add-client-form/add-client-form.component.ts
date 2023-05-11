import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {Router} from "@angular/router";
import {NotificationsService} from "../services/notifications/notifications.service";
import {DataService} from "../services/data/data.service";
import {FormUser} from "../interface/form-user";



@Component({
  selector: 'app-add-client-form',
  templateUrl: './add-client-form.component.html',
  styleUrls: ['./add-client-form.component.scss']
})
export class AddClientFormComponent implements OnInit{

  constructor(private fb: FormBuilder,
              private router: Router,
              private notifications: NotificationsService,
              private data: DataService) {
  }

  hide = true;
  hideConfirm = true;
  savedUsers: FormUser[] = []
  myVariable: boolean = true;
  myValue!: string;

  options = [
    { label: 'Type A', value: 'type A' },
    { label: 'Type B', value: 'type B' },
    { label: 'Type C', value: 'type C' }
  ];

  ngOnInit(): void {
    this.router.navigate(['/add'], {});
    /********************DATASERVICE**************/
    this.data.getSavedUsers().subscribe(users => {
      this.savedUsers = users;
    });
  }

  userFbForm = this.fb.group({
    id: [{value: null, disabled: true}],
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    type: this.fb.control(''),
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
    confirmPassword: ['', Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)],
    phone: ['', [Validators.required, Validators.pattern(/^\+380\d{9}$/)]],
    description: [''],
    sex: '',
    subjects: this.fb.array([
      this.fb.control('')
    ])
  },
    {
      validators: this.checkPassword("password", "confirmPassword")
    });


  onSubmit() {
    if(this.userFbForm.controls["id"].value == null){
      if (!this.userFbForm.controls["id"].untouched || this.userFbForm.controls["id"].dirty) {
        return;
      }

      let possibleId = this.userFbForm.controls["id"].value;
      let newUser: FormUser;
      newUser = {
        id: possibleId == null || possibleId == '' ? null : possibleId,
        name: this.userFbForm.controls['name'].value,
        lastname: this.userFbForm.controls['lastname'].value,
        type: this.userFbForm.controls['type'].value,
        email: this.userFbForm.controls['email'].value,
        phone: this.userFbForm.controls['phone'].value,
        password: this.userFbForm.controls['password'].value,
        subjects: this.userFbForm.controls['subjects'].value,
        description: this.userFbForm.controls['description'].value,
        sex: this.userFbForm.controls['sex'].value,
      }

      /********************DATASERVICE**************/
      this.data.saveUser(newUser).subscribe(saved => {
        if(saved){
          this.userFbForm.reset();
          this.notifications.showSuccess('User saved successfully');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/add']);
          });
        }
        else {
          this.notifications.showError('Failed to save user');
        }
      });
    }
    else{
      let newUser: FormUser;
      newUser = {
        id: this.userFbForm.controls['id'].value,
        name: this.userFbForm.controls['name'].value,
        lastname: this.userFbForm.controls['lastname'].value,
        type: this.userFbForm.controls['type'].value,
        email: this.userFbForm.controls['email'].value,
        phone: this.userFbForm.controls['phone'].value,
        password: this.userFbForm.controls['password'].value,
        subjects: this.userFbForm.controls['subjects'].value,
        description: this.userFbForm.controls['description'].value,
        sex: this.userFbForm.controls['sex'].value,
      }

      /********************DATASERVICE**************/
      this.data.updateUser(newUser).subscribe(updated => {
        if (updated) {
          this.notifications.showSuccess('User updated successfully');
        } else {
          this.notifications.showError('Failed to update user');
        }
      });
    }
  }

  get subjects() {
    return this.userFbForm.get('subjects') as FormArray;
  }

  get type() {
    return this.userFbForm.get('type') as FormArray;
  }

  addSubject() {
    this.subjects.push(this.fb.control("Subject name"));
  }

  checkPassword(password: string, confirmPassword: string){
    return (formGroup: FormGroup) =>{
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];
      if(passwordControl.value !== confirmPasswordControl.value) {
        return {valid: false}
      }
      return null;
    }
  }

  removeSubject(index: number) {
    this.subjects.removeAt(index);
  }

  get isFormValid() {
    return this.userFbForm.valid && this.userFbForm.dirty && this.userFbForm.touched;
  }

  disablBool: boolean = true;

  getData(id: number) {
    this.disablBool = false;
    this.resetForm();
    this.router.navigate(['/add'], {
      queryParams: { id: id }
    });

    /********************DATASERVICE**************/
    this.data.getUserById(id).subscribe(user => {
      if (user) {
        this.notifications.showSuccess('user successfully received');
        this.myVariable = false;
        this.userFbForm.controls['id'].setValue(user.id);
        this.userFbForm.controls['name'].setValue(user.name);
        this.userFbForm.controls['lastname'].setValue(user.lastname);
        this.userFbForm.controls['type'].setValue(user.type);
        this.userFbForm.controls['email'].setValue(user.email);
        this.userFbForm.controls['password'].setValue(user.password);
        this.userFbForm.controls['phone'].setValue(user.phone);
        this.userFbForm.controls['description'].setValue(user.description);
        this.subjects.clear();
        user.subjects.forEach((item, index) => {
          this.subjects.push(this.fb.control(""));
        });
        this.userFbForm.controls['subjects'].setValue(user.subjects);
        this.userFbForm.controls['sex'].setValue(user.sex);
      }
      else{
        this.notifications.showError('Failed to get user');
      }
    });
  }

  deleteData(id: number) {
    /********************DATASERVICE**************/
    this.data.deleteUser(id).subscribe(deleted => {
      if (deleted) {
        this.notifications.showSuccess(`User with ID ${id} was successfully deleted.`);
      } else {
        this.notifications.showError(`User with ID ${id} was not found.`);
      }
    });
  }

  resetForm() {
    this.userFbForm.reset();
  }

  showSuccess() {
    this.notifications.showSuccess('Success!');
  }

  showError() {
    this.notifications.showError('Error!');
  }

  showInfo() {
    this.notifications.showInfo('Info!');
  }

  showWarning() {
    this.notifications.showWarning('Warning!');
  }
}

