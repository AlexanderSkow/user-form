import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  protected username = signal('');

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
}
