import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface UserDTO {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  email: string | null | undefined;
}

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  protected userForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  protected username = signal<string>('');
  protected users = signal<UserDTO[]>([]);

  public noUsers() {
    return this.users().length === 0;
  }

  public updateName() {
    const nancy = {
      firstName: 'Nancy',
      lastName: 'Grace',
      email: 'nancygrace@gmail.com',
    };

    this.userForm.setValue(nancy);
    this.username.set(`${nancy.firstName} ${nancy.lastName}`);
  }

  public resetUserForm() {
    this.userForm.reset();
    this.username.set(``);
  }

  public onUserFormSubmit() {
    const newUser: UserDTO = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
    };
    
    console.log(newUser);
    this.users.update(users => [...users, newUser]);
    this.username.set('');
    this.userForm.reset();

    console.log(this.users());
  }

  public dumpUsers() {
    if (this.noUsers()) {
      alert('There currently are no users...');
      return;
    }

    const areDeleted = confirm('Are you sure you want to do this? This will delete all your users.');
    if (areDeleted) this.users.set([]);
  }
}
